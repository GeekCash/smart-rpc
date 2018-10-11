'use strict';

var axios = require('axios'),
    util = require('util'),
    log = require('loglevel'),
    zmq = require('zmq'),
    LRU = require("lru-cache"),
    Hash = require('mix-hash'),
    EventEmitter = require('events').EventEmitter;


function RPCClient(option) {

    EventEmitter.call(this);
    log.setLevel("info");
    this.opts = option;
    this.id = option.id;
    this.apis = ['abandonTransaction', 'addMultiSigAddress', 'addNode', 'backupWallet', 'clearBanned', 'createMultiSig', 'createRawTransaction', 'debug', 'decodeRawTransaction', 'decodeScript', 'disconnectNode', 'dumpPrivKey', 'dumpWallet', 'encryptWallet', 'estimateFee', 'estimatePriority', 'estimateSmartFee', 'estimateSmartPriority', 'fundRawTransaction', 'generate', 'getAccount', 'getAccountAddress', 'getAddressMempool', 'getAddressUtxos', 'getAddressBalance', 'getAddressDeltas', 'getAddressTxids', 'getAddressesByAccount', 'getAddedNodeInfo', 'getBalance', 'getBestBlockHash', 'getBlock', 'getBlockchainInfo', 'getBlockCount', 'getBlockHashes', 'getBlockHash', 'getBlockHeader', 'getBlockHeaders', 'getBlockTemplate', 'getConnectionCount', 'getChainTips', 'getDifficulty', 'getGenerate', 'getGovernanceInfo', 'getGovernanceInfo', 'getInfo', 'getMemPoolInfo', 'getMiningInfo', 'getNewAddress', 'getNetTotals', 'getNetworkInfo', 'getNetworkHashps', 'getPeerInfo', 'getPoolInfo', 'getRawMemPool', 'getRawChangeAddress', 'getRawTransaction', 'getReceivedByAccount', 'getReceivedByAddress', 'getSpentInfo', 'getSuperBlockBudget', 'getTransaction', 'getTxOut', 'getTxOutProof', 'getTxOutSetInfo', 'getWalletInfo', 'help', 'importAddress', 'instantSendToAddress', 'gobject', 'invalidateBlock', 'importPrivKey', 'importPubKey', 'importElectrumWallet', 'importWallet', 'keyPoolRefill', 'listAccounts', 'listAddressGroupings', 'listBanned', 'listReceivedByAccount', 'listReceivedByAddress', 'listSinceBlock', 'listTransactions', 'listUnspent', 'listLockUnspent', 'lockUnspent', 'masternode', 'masternodeBroadcast', 'masternodeList', 'mnsync', 'move', 'ping', 'prioritiseTransaction', 'privateSend', 'reconsiderBlock', 'resendWalletTransactions', 'sendFrom', 'sendMany', 'sendRawTransaction', 'sendToAddress', 'sentinelPing', 'setAccount', 'setBan', 'setGenerate', 'setTxFee', 'setMockTime', 'spork', 'signMessage', 'signRawTransaction', 'stop', 'submitBlock', 'validateAddress', 'verifyMessage', 'verifyChain', 'verifyTxOutProof', 'voteRaw', 'walletLock', 'walletPassPhrase', 'walletPassphraseChange'];
    this.transactions = LRU(5000);
    this.transactionLocks = LRU(5000);
    this.blocks = LRU(50);

    this.axios = axios.create(option.rpc);

    this.axios.interceptors.response.use(function (response) {
        // Do something with response data
        //console.log(response);
        return response && response.data ? response.data.result : null;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error.response.data);
    });

    this.init();

    if (option.listen && option.socket) {
        this.listen();
    }

}


RPCClient.prototype = {
    init: function () {

        // var own = this;
        for (let i = 0; i < this.apis.length; i++) {
            const a = this.apis[i];
            this[a] = function () {
                var params = [].slice.call(arguments);
                return this.axios.request({
                    data: {
                        jsonrpc: '2.0',
                        method: a.toLowerCase(),
                        params: params,
                        id: new Date().getTime()
                    },
                    maxContentLength: 50 * 1000 * 1000,
                    timeout: 60000
                });

            }

        };

        this._ready();

    },

    _ready: function () {

        var self = this;
        log.info('Check %s Daemon Ready', self.id, new Date());
        this.getBestBlockHash().then((hash) => {
            self.getBlock(hash).then((data) => {
                self.emit('ready');
                log.info('%s Daemon Ready', self.id);
            }).catch(err => {
                setTimeout(function () {
                    self._ready();
                }, 5000);
                return;
            });

        }).catch(err => {
            setTimeout(function () {
                self._ready();
            }, 5000);
            return;
        });

    },

    listen: function () {

        var self = this;
        this.socket = zmq.socket('sub');

        this.socket.on('connect', function (fd, endPoint) {
            log.info('ZMQ connected to:', endPoint);
        });

        this.socket.on('connect_delay', function (fd, endPoint) {
            log.warn('ZMQ connection delay:', endPoint);
        });

        this.socket.on('disconnect', function (fd, endPoint) {
            log.warn('ZMQ disconnect:', endPoint);
        });

        this.socket.on('monitor_error', function (err) {
            log.error('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
            setTimeout(function () {
                self.socket.monitor(500, 0);
            }, 5000);
        });

        // subscribe events 
        this.socket.subscribe('hashblock');
        this.socket.subscribe('rawtx');
        this.socket.subscribe('rawtxlock');
        this.socket.on('message', function (topic, message) {
            var cmd = topic.toString('utf8');
            switch (cmd) {
                case 'rawtxlock':
                    var hash = message.toString('hex');
                    var id = Hash.md5(hash);
                    if (!self.transactionLocks.get(id)) {
                        self.transactionLocks.set(id, true);
                        self.decodeRawTransaction(hash).then(data => {
                            self.emit('txlock', data);
                        });
                    }
                    break;

                case 'rawtx':
                    var hash = message.toString('hex');
                    var id = Hash.md5(hash);
                    if (!self.transactions.get(id)) {
                        self.transactions.set(id, true);
                        self.emit('rawtx', message);
                        self.decodeRawTransaction(hash).then(data => {
                            self.emit('tx', data);
                        });

                    }
                    break;

                case 'hashblock':
                    // Notify block subscribers
                    var hash = message.toString('hex');
                    if (!self.blocks.get(hash)) {
                        self.blocks.set(hash, true);
                        self.emit('hashblock', hash);
                        self.getBlock(hash).then(data => {
                            self.emit('block', data);
                        });
                    }

                    break;
            }


        });

        log.info('Start monitoring...');
        this.socket.monitor(500, 0);
        this.socket.connect(this.opts.socket);

    }


};

util.inherits(RPCClient, EventEmitter);

module.exports = RPCClient;
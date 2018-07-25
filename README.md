Block and Transaction Real-Time Broadcasting
===============

A client library to connect to Multiple RPC in JavaScript. This's library support all coins based Dash.

## Get Started

```
npm i smart-rpc
```
	
## Listen multiple rpc
```js
var SmartRPC = require('smart-rpc');

var options = [{
    id: 'GeekCash',
    socket: 'tcp://127.0.0.1:12345',
    listen: 1,
    rpc: {
        url: 'http://127.0.0.1:6888/',
        method: 'POST',
        auth: {
            username: 'user',
            password: 'password'
        },
    }
},
{
	id: 'Dash',
    socket: 'tcp://127.0.0.1:56789',
    listen: 1,
    rpc: {
        url: 'http://127.0.0.1:9998/',
        method: 'POST',
        auth: {
            username: 'user',
            password: 'password'
        },
    }

}];

SmartRPC.listen(options);

SmartRPC.on('error', function (rpc, error) {        
	console.log('error', rpc.id, error);
});

SmartRPC.on('hashblock', function (rpc, val) {        
	console.log('block', rpc.id, val);
});

SmartRPC.on('block', function (rpc, val) {        
	console.log('block', rpc.id, val);
});

// SmartRPC.on('rawtx', function (rpc, val) {
// 	console.log('rawtx', rpc.id, val);
// });

SmartRPC.on('tx', function (rpc, val) {
	console.log('tx', rpc.id, val.txid);
});

/////////geekcash.conf
// rpcuser=user
// rpcpassword=password
// rpcallowip=127.0.0.1
// rpcport=6888
// listen=1
// server=1
// daemon=1
// logtimestamps=1
// maxconnections=64
// txindex=1
// zmqpubrawtx=tcp://127.0.0.1:12345
// zmqpubrawtxlock=tcp://127.0.0.1:12345
// zmqpubhashblock=tcp://127.0.0.1:12345

/////////dash.conf
// rpcuser=user
// rpcpassword=password
// rpcallowip=127.0.0.1
// rpcport=9998
// listen=1
// server=1
// daemon=1
// logtimestamps=1
// maxconnections=64
// txindex=1
// zmqpubrawtx=tcp://127.0.0.1:56789
// zmqpubrawtxlock=tcp://127.0.0.1:56789
// zmqpubhashblock=tcp://127.0.0.1:56789

```

## rpc client
```js

var option = {
    id: 'GeekCash',
    socket: 'tcp://127.0.0.1:12345',
    listen: 1,
    rpc: {
        url: 'http://127.0.0.1:6888/',
        method: 'POST',
        auth: {
            username: 'user',
            password: 'password'
        },
    }
};

var client = SmartRPC.create(option);

```
```js

// Returns the hash of the best (tip) block in the longest block chain.
// Result
// "hex"      (string) the block hash hex encoded

client.getBestBlockHash().then(data=>{
	console.log(data);	
});
```

```js

// Returns hash of block in best-block-chain at index provided.

// Arguments:
// 1. index         (numeric, required) The block index

// Result:
// "hash"         (string) The block hash

client.getBlockHash(1).then(data=>{
	console.log(data);	
});
```

```js

// If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'.
// If verbose is true, returns an Object with information about block <hash>.

// Arguments:
// 1. "hash"          (string, required) The block hash
// 2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data

// Result (for verbose = true):
// {
//   "hash" : "hash",     (string) the block hash (same as provided)
//   "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
//   "size" : n,            (numeric) The block size
//   "height" : n,          (numeric) The block height or index
//   "version" : n,         (numeric) The block version
//   "merkleroot" : "xxxx", (string) The merkle root
//   "tx" : [               (array of string) The transaction ids
//      "transactionid"     (string) The transaction id
//      ,...
//   ],
//   "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
//   "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
//   "nonce" : n,           (numeric) The nonce
//   "bits" : "1d00ffff", (string) The bits
//   "difficulty" : x.xxx,  (numeric) The difficulty
//   "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
//   "previousblockhash" : "hash",  (string) The hash of the previous block
//   "nextblockhash" : "hash"       (string) The hash of the next block
// }

// Result (for verbose=false):
// "data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

client.getBlock('0000000000a8007ceffa7a644d548d98fd49a5f238480b7a9cfceb642ee48d43', true).then(data=>{
	console.log(data);
});
```

```js

// Returns the number of blocks in the longest block chain.

// Result:
// n    (numeric) The current block count

client.getBlockCount().then(data=>{
	console.log(data);
});
```

```js

// Returns the number of blocks in the longest block chain.

// Result:
// n    (numeric) The current block count

client.getBlockCount().then(data=>{
	console.log(data);
});
```

```js
abandonTransaction: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1896
addMultiSigAddress: 'int str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1142
addNode: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L205
backupWallet: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1931
clearBanned: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L617
createMultiSig: 'int str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L400
createRawTransaction: 'str str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L353
debug: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L122
decodeRawTransaction: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L455
decodeScript: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L521
disconnectNode: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L251
dumpPrivKey: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L553
dumpWallet: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L636
encryptWallet: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2153
estimateFee: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L818
estimatePriority: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L849
estimateSmartFee: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L876
estimateSmartPriority: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L912
fundRawTransaction: 'str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2640
generate: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L126
getAccount: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L312
getAccountAddress: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L199
getAddressMempool: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L586
getAddressUtxos: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L657
getAddressBalance: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L811
getAddressDeltas: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L724
getAddressTxids: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L867
getAddressesByAccount: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L344
getAddedNodeInfo: 'bool str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L273
getBalance: 'str int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L792
getBestBlockHash: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L152
getBlock: 'str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L487
getBlockchainInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L747
getBlockCount: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L135
getBlockHashes: 'int int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L281
getBlockHash: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L315
getBlockHeader: 'str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L340
getBlockHeaders: 'str int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L398
getBlockTemplate: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L342
getConnectionCount: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L31
getChainTips: 'int int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L840
getDifficulty: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L169
getGenerate: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L107
getGovernanceInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/governance.cpp#L901
getInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L51
getMemPoolInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L964
getMiningInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L240
getNewAddress: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L120
getNetTotals: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L389
getNetworkInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L453
getNetworkHashps: 'int int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L85
getPeerInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L85
getPoolInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L68
getRawMemPool: 'bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L238
getRawChangeAddress: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L231
getRawTransaction: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L148
getReceivedByAccount: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L703
getReceivedByAddress: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L645
getSpentInfo: 'obj',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L951
getSuperBlockBudget: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/governance.cpp#L959
getTransaction: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1815
getTxOut: 'str int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L595
getTxOutProof: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L239
getTxOutSetInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L557
getWalletInfo: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2370
help: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/server.cpp#L224
importAddress: 'str str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L83
instantSendToAddress: 'str int str str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L480
gobject: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/governance.cpp#L36
invalidateBlock: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L986
importPrivKey: 'str str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L83
importPubKey: 'str str bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L254
importElectrumWallet: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L419
importWallet: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcdump.cpp#L312
keyPoolRefill: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1957
listAccounts: 'int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1641
listAddressGroupings: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L538
listBanned: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L587
listReceivedByAccount: 'int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1374
listReceivedByAddress: 'int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1335
listSinceBlock: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1720
listTransactions: 'str int int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1512
listUnspent: 'int int str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2524
listLockUnspent: 'bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2294
lockUnspent: 'bool str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2210
masternode: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L111
masternodeBroadcast: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L596
masternodelist: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L446
mnsync: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L146
move: 'str str float int str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L883
ping: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L49
prioritiseTransaction: 'str float int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L284
privateSend: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L28
reconsiderBlock: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L1024
resendWalletTransactions: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2499
sendFrom: 'str str float int str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L956
sendMany: 'str obj int str str bool bool',  //https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L1020
sendRawTransaction: 'str bool bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L825
sendToAddress: 'str float str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L413
sentinelPing: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/masternode.cpp#L820
setAccount: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L266
setBan: 'str str int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/net.cpp#L524
setGenerate: 'bool int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L196
setTxFee: 'float',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2343
setMockTime: 'int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L497
spork: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L259
signMessage: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L589
signRawTransaction: 'str str str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L583
stop: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/server.cpp#L245
submitBlock: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/mining.cpp#L757,
validateAddress: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L269
verifyMessage: 'str str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/misc.cpp#L443
verifyChain: 'int int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/blockchain.cpp#L677
verifyTxOutProof: 'str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/rawtransaction.cpp#L320
voteRaw: 'str int',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/rpc/governance.cpp#L840
walletLock: '',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2114
walletPassPhrase: 'str int bool',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2001
walletPassphraseChange: 'str str',//https://github.com/dashpay/dash/blob/v0.12.2.x/src/wallet/rpcwallet.cpp#L2068

```
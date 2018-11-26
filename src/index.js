var RPCClient = require('./lib'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

function SmartRPC() {
    EventEmitter.call(this);
};

SmartRPC.prototype = {
    create: function (option) {
        return new RPCClient(option);
    },
    listen: function (options) {

        if (!Array.isArray(options)) options = [options];

        var own = this;

        this.clients = [];

        for (let i = 0; i < options.length; i++) {
            var o = options[i];           
            var client = this.create(Object.assign(o, { listen: 1 }));
            this.clients.push(client);
        };

        for (let i = 0; i < this.clients.length; i++) {
            const client = this.clients[i];

            client.on('error', function (error) {
                own.emit('error', client, error);
            });

            client.on('hashblock', function (val) {
                own.emit('hashblock', client, val);
            });

            client.on('block', function (val) {
                own.emit('block', client, val);
            });

            client.on('rawtx', function (val) {
                own.emit('rawtx', client, val);
            });

            client.on('tx', function (val) {
                own.emit('tx', client, val);
            });
            
        }

    }
};

util.inherits(SmartRPC, EventEmitter);

module.exports = new SmartRPC();
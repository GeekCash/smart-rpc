'use strict';
var SmartRPC = require('../dist'),
    _ = require('mix-dash'),
    Hash = require('mix-hash');

var o = [
    {
        id: 'GEEK',
        socket: 'tcp://127.0.0.1:28332',
        listen: 1,
        rpc: {
            url: 'http://127.0.0.1:6888/',
            method: 'POST',
            auth: {
                username: 'root',
                password: 'a7c43e2f2b93e8d65cdf4820e4e7de406d4e5ea00af17b653c5045607cd37dc6'
            },
        },
        //ready: 1

    },


];


SmartRPC.listen(o);

// SmartRPC.on('ready', function (rpc, error) {  
//     console.log('error', rpc.id, error);
// });

// SmartRPC.on('error', function (rpc, error) {  
//     console.log('error', rpc.id, error);
// });

// SmartRPC.on('hashblock', function (rpc, val) {

//     console.log('block', rpc.id, val);
// });

SmartRPC.on('block', function (rpc, val) {
    
     console.log('block', rpc.id, val);
});

SmartRPC.on('tx', function (rpc, val) {
    console.log('tx', rpc.id, val.txid);
});


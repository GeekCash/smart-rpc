'use strict';
var SmartRPC = require('../dist'),    
    Hash = require('mix-hash');

var o = [{
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
    }

}];


SmartRPC.listen(o);


SmartRPC.on('error', function (rpc, error) {  
    console.log('error', rpc.id, error);
});

SmartRPC.on('hashblock', function (rpc, val) {
   
    console.log('block', rpc.id, val);
});

// SmartRPC.on('block', function (id, val) {
//     
//      console.log('block', rpc.id, val);
// });

SmartRPC.on('tx', function (rpc, val) {
    console.log('tx', rpc.id, val.txid);
})

   
    //var result = await client.getBlockchainInfo();
    //var result = await client.getBlockCount();
    //var result = await client.getBlockHash(102007);
    // var result = await client.getBestBlockHash();
    //var result = await client.getBlock('00000000024a185d44648a60a88857ef736910607b9320776319ee88681dcd31');

    //var result = await client.decodeRawTransaction('01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff2003229901042bec565b086800b941010000000d2f6e6f64655374726174756d2f00000000028bf71af3390000001976a9146106fc753cf6688150f34d9e729a8f4f23d4cd6b88ac7250a377000000001976a9146106fc753cf6688150f34d9e729a8f4f23d4cd6b88ac00000000');


    //console.log(JSON.stringify(result, null, '\t'));



'use strict';
var SmartRPC = require('../dist'),
    _ = require('mix-dash'),
    Hash = require('mix-hash');

var o = [{
    id: 'GEEK',
    socket: 'tcp://127.0.0.1:28332',
    listen: 0,
    rpc: {
        url: 'http://127.0.0.1:6888/',
        method: 'POST',
        auth: {
            username: 'root',
            password: 'a7c43e2f2b93e8d65cdf4820e4e7de406d4e5ea00af17b653c5045607cd37dc6'
        },
    }

}];


// SmartRPC.listen(o);


// SmartRPC.on('error', function (rpc, error) {  
//     console.log('error', rpc.id, error);
// });

// SmartRPC.on('hashblock', function (rpc, val) {

//     console.log('block', rpc.id, val);
// });

// // SmartRPC.on('block', function (id, val) {
// //     
// //      console.log('block', rpc.id, val);
// // });

// SmartRPC.on('tx', function (rpc, val) {
//     console.log('tx', rpc.id, val.txid);
// })


(async () => {

    var client = SmartRPC.create(o[0]);


    //var result = await client.getBlockchainInfo();
    //var result = await client.getBlockCount();
    //var result = await client.getBlockHash(102007);
    // var result = await client.getBestBlockHash();
    //var result = await client.getBlock('00000000024a185d44648a60a88857ef736910607b9320776319ee88681dcd31');

    //var result = await client.decodeRawTransaction('01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff2003229901042bec565b086800b941010000000d2f6e6f64655374726174756d2f00000000028bf71af3390000001976a9146106fc753cf6688150f34d9e729a8f4f23d4cd6b88ac7250a377000000001976a9146106fc753cf6688150f34d9e729a8f4f23d4cd6b88ac00000000');

    // var result = await client.getRawTransaction('deaa210479a83826d004c97486892fb8b3f8a3e73a9eca4b3e06dddbdd27100a', 1);

    // console.log(JSON.stringify(result, null, '\t'));


    // client.sendFrom('', 'GgWAQipRtZw2uSjdkcY92uZ1VemERg8mTs', 1).then(data => {
    //     console.log(JSON.stringify(data, null, '\t'));
    // }).catch(err => {
    //     console.log(err);
    // });

    // client.sendToAddress('GgWAQipRtZw2uSjdkcY92uZ1VemERg8mTs', 1).then(data => {
    //     console.log(JSON.stringify(data, null, '\t'));
    // }).catch(err => {
    //     console.log(err);
    // });

    

    client.getBalance().then(data => {
        console.log(JSON.stringify(data, null, '\t'));
    }).catch(err => {
        console.log(err);
    });



    // client.getAddressUtxos( { addresses: ['Gh9xP2hGg3s3mf7w3oKPpitxdP69UcqFE7'] }).then(data => {
    //     console.log(JSON.stringify(data, null, '\t'));
    // }).catch(err => {
    //     console.log(err);
    // })

    //   client.getAddressBalance( { addresses: ['GdUYWaFFfCqd6GMPR3rPPbQtWF5mkoyW4d'] }).then(data => {
    //     console.log(JSON.stringify(data, null, '\t'));
    // }).catch(err => {
    //     console.log(err);
    // })

    // geekcash-cli getaddressbalance '{"addresses": ["GdUYWaFFfCqd6GMPR3rPPbQtWF5mkoyW4d"]}'
    // var result = await client.masternodeList('lastseen');



})();


// {
//     "address": "GdUYWaFFfCqd6GMPR3rPPbQtWF5mkoyW4d",
//     "txid": "deaa210479a83826d004c97486892fb8b3f8a3e73a9eca4b3e06dddbdd27100a",
//     "outputIndex": 0,
//     "script": "76a914d7577e83a76053a3a9377e646c9d1753aa5fd52788ac",
//     "satoshis": 1000000000,
//     "height": 189568
// },
// {
//     "address": "GdUYWaFFfCqd6GMPR3rPPbQtWF5mkoyW4d",
//     "txid": "71af859100f69faf8bbc9887e5be461a48fc6f8c05894ce889c5e41d3ee2c91d",
//     "outputIndex": 0,
//     "script": "76a914d7577e83a76053a3a9377e646c9d1753aa5fd52788ac",
//     "satoshis": 100000000000,
//     "height": 190579
// }
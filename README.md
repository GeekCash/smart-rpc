Block and Transaction Real-Time Broadcasting
===============

A client library to connect to Multiple RPC in JavaScript.

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

client.on('block', function (rpc, val) {        
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
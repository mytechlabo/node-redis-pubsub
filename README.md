# Node Redis PubSub

## Setup
### Install package
```sh 
$ npm install
```

```sh
$ node order.js
$ node payment.js
$ node addPoint.js
$ node sendEmail.js

$ curl http://localhost:3000/order
```


## How to subscribe to multiple channels on Redis NodeJS

### Redis v3
```javascript
var redis = require('redis')

const subscribe = redis.createClient({
    host: 'localhost',
    port: 6379
}) 
subscribe.psubscribe(`user:chat:*`)

subscribe.on('message', function(pattern, channel, message) {
    console.log(channel, message, pattern)
    // Write Your Awesome Code here.
})
```

### Redis v4
```javascript
import { createClient } from 'redis';

(async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'value');
  const value = await client.get('key');
})();
```

## Video
- [Thiết kế microservices với Nodejs và Redis Pub/Sub](https://www.youtube.com/watch?v=wzZXRoeYFPw)
- [Redis](https://redis.io/)
- [Node-Redis](https://github.com/redis/node-redis)
- [Node-Redis Doc](https://redis.js.org/)
- [v3 to v4 Migration Guide](https://github.com/redis/node-redis/blob/HEAD/docs/v3-to-v4.md)

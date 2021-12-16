const express = require("express");
const redis = require("redis");

const app = express();

const publish = redis.createClient();
const subscribe = publish.duplicate();

subscribe.on("error", (err) => console.log("Redis Client Error", err));
subscribe.on("connect", () => console.log("Connected"));

publish.connect();
subscribe.connect();

subscribe.subscribe("checkout", (message, channel) => {
  console.log("Payment channel: ", channel);
  console.log("Payment message: ", JSON.parse(message));

  publish.publish("payment", "Payment success!");
});

app.listen(3031, () => {
  console.log(`The server is running 3031`);
});

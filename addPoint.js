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
  console.log("Add Point channel: ", channel);
  console.log("Add Point message: ", JSON.parse(message));

  publish.publish("addPoint", "Add Point success!");
});

app.listen(3032, () => {
  console.log(`The server is running 3032`);
});

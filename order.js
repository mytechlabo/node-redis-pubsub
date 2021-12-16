const express = require("express");
const redis = require("redis");

const app = express();

const order = {
  userId: 1,
  products: [
    {
      productId: 1,
      price: 1000,
    },
    {
      productId: 2,
      price: 2000,
    },
  ],
};

const publish = redis.createClient();
const subscribe = publish.duplicate();

publish.on("error", (err) => console.log("Redis Client Error", err));
publish.on("connect", () => console.log("Connected"));

publish.connect();
subscribe.connect();

subscribe.subscribe("payment", (message, channel) => {
  console.log("Callback: %s %s", channel, message);
});
subscribe.subscribe("addPoint", (message, channel) => {
  console.log("Callback: %s %s", channel, message);
});
subscribe.subscribe("sendEmail", (message, channel) => {
  console.log("Callback: %s %s", channel, message);
});

app.get("/order", (req, res) => {
  // publish to service payment.js, addPoint.js and sendEmail.js
  publish.publish("checkout", JSON.stringify(order));

  res.json({
    status: "success",
    message: "checkout success!",
  });
});

app.listen(3030, () => {
  console.log(`The server is running 3030`);
});

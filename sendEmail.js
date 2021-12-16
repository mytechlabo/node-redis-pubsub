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
  console.log("SendMail channel: ", channel);
  console.log("SendMail message: ", JSON.parse(message));

  publish.publish("sendEmail", "Send Email success!");
});

// subscribe.pSubscribe("o*", (message, channel) => {
//   console.log("SendMail channel ", channel);
//   console.log("SendMail message", JSON.parse(message));
// });

app.listen(3033, () => {
  console.log(`The server is running 3033`);
});

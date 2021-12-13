const { createClient } = require("redis");
const client = createClient({ host: "0.0.0.0", port: 6379 });

client.on("connect", () => {
  console.log("redis connected");
});

client.on("ready", () => {
  console.log("redis connected and ready");
});

client.on("error", (err) => {
  console.log("redis connection have err", err);
});

client.on("end", () => {
  console.log("redis disconnected");
});

(async () => {
  await client.connect();
})();

module.exports = client;

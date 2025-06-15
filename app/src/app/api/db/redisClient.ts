import { createClient } from "redis";

// 172.17.0.2 -- use this for docker container deployment
const client = createClient({
  socket: { host: "192.168.1.2", autoSelectFamily: true, port: 6379 },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;

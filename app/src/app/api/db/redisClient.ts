import { createClient } from "redis";

const client = createClient({ socket: { host: "172.17.0.2", autoSelectFamily:true, port: 6379 }});

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;

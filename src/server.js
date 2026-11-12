import { createServer } from "node:http";
import { createApp } from "#app/app.js";
import { env } from "#app/config/env.js";
import { checkDatabaseConnection, pool } from "#app/db/pool.js";

const server = createServer(createApp());

startServer();

async function startServer() {
  try {
    await checkDatabaseConnection();
    console.log("PostgreSQL connection established");

    server.listen(env.port, () => {
      console.log(`Backend listening on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error({ error, message: "Unable to connect to PostgreSQL" });
    await pool.end();
    process.exitCode = 1;
  }
}

async function shutdown(signal) {
  console.log(`${signal} received, shutting down`);

  try {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

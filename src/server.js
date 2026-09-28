import { createServer } from 'node:http';
import { createApp } from '#app/app.js';
import { env } from '#app/config/env.js';

const server = createServer(createApp());

server.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
      return;
    }
    process.exit(0);
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

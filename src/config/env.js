const port = Number(process.env.PORT);
const baseUrl = process.env.BASE_URL;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

try {
  new URL(baseUrl);
} catch {
  throw new Error('BASE_URL must be a valid URL');
}

export const env = {
  baseUrl,
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  port,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
};

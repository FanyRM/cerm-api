export const config = {
  jwtSecret: process.env.JWT_SECRET ?? '',
  port: Number(process.env.PORT) || 3000,
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
};

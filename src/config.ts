import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASS,
      url: process.env.DATABASE_URL,
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      params: process.env.DATABASE_PARAMS,
      cluster: process.env.DATABASE_CLUSTER,
    },
  };
});

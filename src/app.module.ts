import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PARAMS: Joi.string().required(),
        DATABASE_CLUSTER: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

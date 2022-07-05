import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, pass, url, name, port, params, cluster } =
          configService.database;

        return {
          type: 'cockroachdb',
          url: `postgresql://${user}:${pass}@${url}:${port}/${name}?${params}`,
          ssl: true,
          extra: {
            options: `--cluster=${cluster}`,
          },
          synchronize: true,
          entities: ['dist/**/*.entity.js'],
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}

import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Organization } from '../organizations/entities/organization.entity';
import { Tribe } from '../tribes/entities/tribe.entity';
import { Repository } from '../repositories/entities/repository.entity';
import { Metrics } from 'src/metrics/entities/metrics.entity';

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
          synchronize: false,
          entities: [Organization, Repository, Metrics, Tribe],
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

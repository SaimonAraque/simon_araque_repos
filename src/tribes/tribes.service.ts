import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { HttpService } from '@nestjs/axios';

import { Tribe } from './entities/tribe.entity';

import { RepositoryState } from 'src/repositories/enums/states.enum';

@Injectable()
export class TribesService {
  constructor(
    @InjectRepository(Tribe)
    private tribeRepo: Repository<Tribe>,
    private readonly httpService: HttpService,
  ) {}

  async getRepositories(tribeId: number) {
    const maxDate = moment()
      .subtract(365, 'days')
      .format('YYYY-MM-DD hh:mm:ss');

    const tribe = await this.tribeRepo
      .createQueryBuilder('tribe')
      .leftJoinAndSelect(
        'tribe.repositories',
        'repository',
        'repository.create_time > :maxDate AND repository.state = :state',
        { maxDate, state: 'E' },
      )
      .innerJoinAndSelect(
        'repository.metrics',
        'metrics',
        'metrics.coverage > :coverage',
        { coverage: 75 },
      )
      .innerJoinAndSelect('tribe.organization', 'organization')
      .where('tribe.id_tribe = :id', { id: tribeId })
      .getOne();

    if (!tribe) {
      throw new NotFoundException(
        `La Tribu #${tribeId} no se encuentra registrada`,
      );
    }

    if (tribe.repositories.length === 0) {
      throw new NotFoundException(
        `La Tribu #${tribeId} no tiene repositorios que cumplan con la cobertura necesaria`,
      );
    }

    const verification = await this.httpService.axiosRef.get(
      'http://localhost:3000/repositories',
    );

    return {
      repositories: tribe.repositories.map((repo) => {
        const rep = verification.data.repositories.find(
          (r) => r.id_repository === repo.id_repository,
        );

        const { metrics } = repo;

        let verificationState = null;

        if (rep.state === 604) {
          verificationState = 'Verified';
        } else if (rep.state === 605) {
          verificationState = 'Waiting';
        } else {
          verificationState = 'Approved';
        }

        return {
          id_repository: repo.id_repository,
          name: repo.name,
          tribe: tribe.name,
          organization: tribe.organization.name,
          coverage: metrics.coverage + '%',
          codeSmells: metrics.code_smells,
          bugs: metrics.bugs,
          vulnerabilities: metrics.vulnerabilities,
          hotspots: metrics.hotspot,
          verificationState: verificationState,
          state: RepositoryState[repo.state],
        };
      }),
    };
  }
}

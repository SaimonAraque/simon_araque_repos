import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryModel } from './entities/repository.entity';

const states = [604, 605, 606];

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(RepositoryModel)
    private repositoryRepo: Repository<RepositoryModel>,
  ) {}

  async findAll() {
    const repositories = await this.repositoryRepo
      .createQueryBuilder('repository')
      .select('repository.id_repository')
      .getMany();

    return {
      repositories: repositories.map((repo) => {
        const randomIndex = Math.floor(Math.random() * states.length);

        return {
          ...repo,
          state: states[randomIndex],
        };
      }),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organization } from './entities/organization.entity';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dtos/organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  findAll() {
    return this.organizationRepo.find();
  }

  create(data: CreateOrganizationDto) {
    const organization = this.organizationRepo.create(data);

    return this.organizationRepo.save(organization);
  }

  async update(id: number, data: UpdateOrganizationDto) {
    const organization = await this.organizationRepo.findOneBy({
      id_organization: id,
    });

    this.organizationRepo.merge(organization, data);

    return this.organizationRepo.save(organization);
  }

  remove(id: number) {
    return this.organizationRepo.delete(id);
  }
}

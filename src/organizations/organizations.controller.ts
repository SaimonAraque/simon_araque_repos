import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dtos/organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrganizationDto) {
    return this.organizationsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrganizationDto) {
    return this.organizationsService.update(id, payload);
  }
}

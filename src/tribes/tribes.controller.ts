import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TribesService } from './tribes.service';

import * as json2csv from 'json2csv';

@Controller('tribes')
export class TribesController {
  constructor(private tribesService: TribesService) {}

  @Get(':id/repositories')
  repositories(@Param('id') id: number) {
    return this.tribesService.getRepositories(id);
  }

  @Get(':id/repositories/csv')
  async repositoriesCsv(@Param('id') id: number, @Res() res: Response) {
    const repositories = await this.tribesService.getRepositories(id);

    const csv = json2csv.parse(repositories.repositories);

    res.header('Content-Type', 'text/csv');
    res.attachment('metrics.csv');

    return res.send(csv);
  }
}

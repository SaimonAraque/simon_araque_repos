import { Controller, Get, Param } from '@nestjs/common';
import { TribesService } from './tribes.service';

@Controller('tribes')
export class TribesController {
  constructor(private tribesService: TribesService) {}

  @Get(':id/repositories')
  repositories(@Param('id') id: number) {
    return this.tribesService.getRepositories(id);
  }
}

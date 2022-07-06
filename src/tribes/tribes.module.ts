import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { TribesController } from './tribes.controller';
import { TribesService } from './tribes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tribe]), HttpModule],
  controllers: [TribesController],
  providers: [TribesService],
})
export class TribesModule {}

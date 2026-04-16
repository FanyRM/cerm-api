import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, UtilService],
})
export class TaskModule {}

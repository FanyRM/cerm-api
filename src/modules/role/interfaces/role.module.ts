import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, PrismaService, UtilService],
})
export class RoleModule {}

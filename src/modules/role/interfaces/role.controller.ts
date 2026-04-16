import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('/api/role')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class RoleController {
  constructor(private roleSvc: RoleService) {}

  @Get('')
  async getAll() {
    return await this.roleSvc.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleSvc.getById(id);
  }

  @Post('')
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleSvc.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.roleSvc.delete(id);
    return { message: `Rol con ID ${id} eliminado` };
  }
}

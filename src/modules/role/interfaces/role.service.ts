import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  public async getAll() {
    return await this.prisma.role.findMany({ orderBy: { name: 'asc' } });
  }

  public async getById(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return role;
  }

  public async create(dto: CreateRoleDto) {
    const exists = await this.prisma.role.findUnique({ where: { name: dto.name } });
    if (exists) throw new BadRequestException(`El rol '${dto.name}' ya existe`);
    return await this.prisma.role.create({ data: { name: dto.name } });
  }

  public async delete(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { users: true },
    });
    if (!role) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    if (role.users.length > 0)
      throw new BadRequestException('No se puede eliminar un rol con usuarios asignados');
    return await this.prisma.role.delete({ where: { id } });
  }
}

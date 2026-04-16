import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private util: UtilService,
  ) {}

  public async getAllUsers() {
    return await this.prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        createdAt: true,
        roles: { select: { role: { select: { id: true, name: true } } } },
      },
    });
  }

  public async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        createdAt: true,
        roles: { select: { role: { select: { id: true, name: true } } } },
      },
    });
  }

  public async insertUser(dto: CreateUserDto) {
    const exists = await this.prisma.user.findFirst({
      where: { username: dto.username },
    });
    if (exists) throw new BadRequestException('El nombre de usuario ya existe');

    const encryptedPassword = await this.util.hash(dto.password);

    const roleName = dto.roleName ?? 'USER';
    const role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new BadRequestException(`El rol '${roleName}' no existe`);

    return await this.prisma.user.create({
      data: {
        name: dto.name,
        lastName: dto.lastName,
        username: dto.username,
        password: encryptedPassword,
        roles: { create: { roleId: role.id } },
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        createdAt: true,
        roles: { select: { role: { select: { id: true, name: true } } } },
      },
    });
  }

  public async updateUser(id: number, userUpdate: UpdateUserDto) {
    if (userUpdate.password) {
      userUpdate.password = await this.util.hash(userUpdate.password);
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        name: userUpdate.name,
        lastName: userUpdate.lastName,
        username: userUpdate.username,
        password: userUpdate.password,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        createdAt: true,
        roles: { select: { role: { select: { id: true, name: true } } } },
      },
    });
  }

  public async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (user?.tasks && user.tasks.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar el usuario porque tiene tareas asignadas',
      );
    }

    await this.prisma.userRole.deleteMany({ where: { userId: id } });
    return await this.prisma.user.delete({ where: { id } });
  }
}

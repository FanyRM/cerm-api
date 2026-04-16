import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username },
      include: { roles: { include: { role: true } } },
    });
  }

  public async getUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }

  public async updateHash(user_id: number, hash: string | null) {
    return await this.prisma.user.update({
      where: { id: user_id },
      data: { hash },
    });
  }
}

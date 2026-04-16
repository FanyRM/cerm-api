import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  public async getTasksByUser(userId: number) {
    return await this.prisma.task.findMany({
      where: { user_id: userId },
      orderBy: { name: 'asc' },
    });
  }

  public async getTaskById(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    if (task.user_id !== userId)
      throw new ForbiddenException('No tienes acceso a esta tarea');
    return task;
  }

  public async insertTask(task: CreateTaskDto, userId: number) {
    return await this.prisma.task.create({
      data: {
        name: task.name,
        description: task.description,
        priority: task.priority,
        user_id: userId,
      },
    });
  }

  public async updateTask(id: number, taskUpdate: UpdateTaskDto, userId: number) {
    await this.getTaskById(id, userId);
    return await this.prisma.task.update({
      where: { id },
      data: taskUpdate,
    });
  }

  public async deleteTask(id: number, userId: number) {
    await this.getTaskById(id, userId);
    return await this.prisma.task.delete({ where: { id } });
  }
}

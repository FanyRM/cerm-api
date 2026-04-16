import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('/api/task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private tasksvc: TaskService) {}

  @Get('')
  async getAllTasks(@Req() req: any) {
    return await this.tasksvc.getTasksByUser(req.user.id);
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return await this.tasksvc.getTaskById(id, req.user.id);
  }

  @Post('')
  public async insertTask(@Body() task: CreateTaskDto, @Req() req: any) {
    return await this.tasksvc.insertTask(task, req.user.id);
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
    @Req() req: any,
  ) {
    return await this.tasksvc.updateTask(id, task, req.user.id);
  }

  @Delete(':id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    await this.tasksvc.deleteTask(id, req.user.id);
    return { message: `Tarea con ID ${id} eliminada` };
  }
}

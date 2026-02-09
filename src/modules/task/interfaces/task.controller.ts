import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(public readonly taskSvc: TaskService) {}

  @Get()
  public getAllTasks(): string {
    return this.taskSvc.getAllTasks();
  }

  @Get(':id')
  public getTaskById(@Param() params: any, id: string): string {
    return this.taskSvc.getTaskById(id);
  }

  @Post()
  public insertTask(task: any): any {
    return this.taskSvc.insertTask(task);
  }

  @Put()
  public updateTask(task: any): any {
    return this.taskSvc.updateTask(task);
  }

  @Delete(':id')
  public deleteTask(id: string): string {
    return this.taskSvc.deleteTask(id);
  }
}

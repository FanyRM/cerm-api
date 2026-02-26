import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
//import { Connection } from 'mysql2/promise';

@Injectable()
export class TaskService {
  constructor(@Inject('MYSQL_CONNECTION') private mysql: any) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY name ASC`;

    const [results] = await this.mysql.query(query);

    return results as Task[];
  }

  public getTaskById(id: string): string {
    return `Obteniendo la tarea con ID: ${id}`;
  }

  public insertTask(task: any): any {
    return task;
  }

  public updateTask(task: any): any {
    return task;
  }

  public deleteTask(id: string): string {
    return `Eliminando la tarea con ID: ${id}`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { PrismaService } from 'src/common/services/prisma.service';
//import { Connection } from 'mysql2/promise';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private mysql: any,
    private prisma: PrismaService,
  ) {}

  //Get all tasks
  public async getAllTasks(): Promise<Task[]> {
    const task = await this.prisma.task.findMany({ orderBy: { name: 'asc' } });
    return task;
  }

  //Get task by ID
  public async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task;
  }

  //Insert a new task
  public async insertTask(task: CreateTaskDto): Promise<Task> {
    const newTask = await this.prisma.task.create({ data: task });
    return newTask;
  }

  //Update a task
  public async updateTask(
    id: number,
    taskUpdate: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: taskUpdate,
    });
    return task;
  }

  //Delete a task

  public async deleteTask(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({ where: { id } });

    return task;
  }
}

/* public async getAllTasks(): Promise<Task[]> {
  const query = `SELECT * FROM tasks ORDER BY name ASC`;
  
  const [results] = await this.mysql.query(query);
  
  return results as Task[];
} */
/* public async getTaskById(id: number): Promise<Task> {
  const query = `SELECT * FROM tasks WHERE id = ${id}`;
  
  const [results] = await this.mysql.query(query);
  
  console.log(results);
  
  return results[0] as Task;
} */
/* public async insertTask(task: CreateTaskDto): Promise<Task> {
  const sql = `INSERT INTO tasks (name, description, priority, user_id) VALUES ('${task.name}', '${task.description}', ${task.priority}, ${task.user_id})`;
  
  const [results] = await this.mysql.query(sql);
  
  const insertedId = results.insertId;
  
  return await this.getTaskById(insertedId);
} */
/* public async updateTask(
  id: number,
  taskUpdate: UpdateTaskDto,
): Promise<Task> {
  const task = await this.getTaskById(id);
  task.name = taskUpdate.name ?? task.name;
  task.description = taskUpdate.description ?? task.description;
  task.priority =
  taskUpdate.priority !== undefined ? taskUpdate.priority : task.priority;
  
  const sql = `
  UPDATE tasks 
  SET name = '${task.name}', 
  description = '${task.description}', 
  priority = ${task.priority} 
  WHERE id = ${id}`;
  
  await this.mysql.query(sql);
  
  return await this.getTaskById(id);
} */
/*  public async deleteTask(id: number): Promise<boolean> {
  const sql = `DELETE FROM tasks WHERE id = ${id}`;
  
  const [results] = await this.mysql.query(sql);
  
  return results.affectedRows > 0;
} */

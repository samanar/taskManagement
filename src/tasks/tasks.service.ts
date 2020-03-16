import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksFiltered(filterDto : GetTasksFilterDto): Task[] {
        const {status , search} = filterDto;

        let tasks: Task[] = this.getAllTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search) 
            )
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if(!task) throw new NotFoundException();
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const task: Task = {
            id: uuidv4(),
            ...createTaskDto,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string , status: TaskStatus) {
        const task: Task  = this.getTaskById(id);
        task.status = status;
        return task;
    }


}

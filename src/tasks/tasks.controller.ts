import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/validators/task-status-validation.validator.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}    

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) return this.taskService.getTasksFiltered(filterDto);
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);    
    }

    @Patch('/:id/status') 
    updateTaskStatus(
        @Param('id') id: string, 
        @Body('status' , TaskStatusValidation) status: TaskStatus
        ) : Task {
            return this.taskService.updateTaskStatus(id , status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

}


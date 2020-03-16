import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task.model";

export class TaskStatusValidation implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) throw new BadRequestException() 
        return value;
    }


    private isStatusValid(status) {
        return this.allowedStatuses.indexOf(status) !== -1;
    }

}
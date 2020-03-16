import { TaskStatus } from "../task.model";
import {IsOptional, IsNotEmpty, IsIn} from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN ,TaskStatus.DONE , TaskStatus.IN_PROGRESS])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
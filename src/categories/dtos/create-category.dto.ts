import { ArrayMinSize, IsArray, IsNotEmpty, isString, IsString } from 'class-validator';
import { Event } from '../interfaces/category.interface';

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly category: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsArray()
    @ArrayMinSize(1)
    events: Array<Event>;
}
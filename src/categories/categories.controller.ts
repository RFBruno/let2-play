import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Api } from 'src/util/serve-path';
import { Category } from './interfaces/category.interface';

@Controller(`${Api.APIV1}/categories`)
export class CategoriesController {
    constructor(
        private readonly categoriesService:CategoriesService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDTO: CreateCategoryDTO):Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDTO);
    }
}

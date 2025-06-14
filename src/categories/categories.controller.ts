import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Api } from 'src/util/serve-path';
import { Category } from './interfaces/category.interface';
import { UpdateCategoryDTO } from './dtos/update-category.dto copy';

@Controller(`${Api.APIV1}/categories`)
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryDTO);
    }

    @Get()
    async findAllPlayers(
    ): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Get('/:category')
    @UsePipes(ValidationPipe)
    async findOnePlayer(
        @Param('category') category: string
    ): Promise<Category> {
        return await this.categoriesService.findOne(category.toLocaleUpperCase());
    }

    @Put('/:category')
    @UsePipes(ValidationPipe)
    async updatePlayer(@Body() updateCategory: UpdateCategoryDTO, @Param('category') category: string): Promise<void> {
        await this.categoriesService.updateCategory(category.toUpperCase(), updateCategory);
    }

    @Post('/:category/players/:idPlayer')
    async setCategoryPlayer(
        @Param() params: string[]
    ): Promise<void> {
        await this.categoriesService.setCategoryPlayer(params);
    }
}

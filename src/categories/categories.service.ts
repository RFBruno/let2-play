import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';
import { Category } from './interfaces/category.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoriesService {

    private readonly logger = new Logger(CategoriesService.name);
    private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
    private categories: Category[] = [];

    constructor() {
        this.myJsonBaseService.readData("categories").then(data => this.categories = data);
    }

    async createCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const { category } = createCategoryDTO;
        const findCategory = await this.findCategory('category', category);
        if (findCategory) {
            throw new BadRequestException('Categoria já cadastrada.')
        }

        return await this.create(createCategoryDTO);
    }

    async findAll(): Promise<Category[]> {
        this.logger.log(`List -> ${JSON.stringify(this.categories)}`);
        return this.categories;
    }

    async findOne(category: string): Promise<Category> {
        const findCategory = await this.findCategory('category', category);
        if (!findCategory) {
            throw new NotFoundException(`Nenhuma categoria encontrada.`);
        }
        return findCategory;
    }

    private async create(createCategoryDTO: CreateCategoryDTO) {
        const { category, description, events } = createCategoryDTO;
        const categoryObj: Category = {
            category,
            description,
            events,
            players: []
        }

        this.logger.log(`createCategoryDTO -> ${JSON.stringify(categoryObj)}`)
        this.categories.push(categoryObj);
        await this.saveData();
        return categoryObj;
    }


    // private update(findPlayer: Category, updatePlayerDTO: Object): void {
    //     const { name } = updatePlayerDTO;
    //     findPlayer.name = name;
    //     this.saveData();
    // }

    // async deletePlayer(_id: string): Promise<void> {
    //     const findPlayer = await this.findPlayer('_id', _id);

    //     this.players = this.players.filter(p => p._id != findPlayer?._id);
    // }

    private async findCategory(param: string, value: any): Promise<Category | undefined> {
        return this.categories.find(p => p[param] == value)
    }

    private async saveData() {
        await this.myJsonBaseService.writeData(this.categories);
        this.logger.log({ message: 'Salvo sucesso!' });
    }
}

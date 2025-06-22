import { PlayersService } from './../players/players.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';
import { Category } from './interfaces/category.interface';
import { randomUUID } from 'crypto';
import { UpdateCategoryDTO } from './dtos/update-category.dto copy';

@Injectable()
export class CategoriesService {

    private readonly logger = new Logger(CategoriesService.name);
    private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
    private categories: Category[] = [];

    constructor(
        private readonly playersService: PlayersService
    ) {
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

    async updateCategory(category: string, updateCategory: UpdateCategoryDTO) {
        const findCategory = await this.findOne(category);
        if (!findCategory) {
            throw new NotFoundException(`Nenhuma categoria encontrada.`);
        }

        await this.update(findCategory, updateCategory);
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

    async findCategoryPlayer(id: string): Promise<Category> {
        const findCategory = this.categories.find(category => {
            return category.players.find(p => p._id === id);
        });
        if (!findCategory) {
            throw new NotFoundException(`Nenhuma categoria encontrada.`);
        }
        return findCategory;
    }
    
    async setCategoryPlayer(params: string[]) {
        const category: string = params['category']?.toUpperCase();
        const idPlayer = params['idPlayer'];

        const findCategory: Category = await this.findOne(category);
        if (!findCategory) {
            throw new NotFoundException(`Nenhuma categoria encontrada.`);
        }
        const playerInCategory = this.findPlayerInCategory(findCategory, idPlayer);
        if (playerInCategory) {
            throw new NotFoundException(`Jogador ${idPlayer} já cadastrado na Categoria ${category}.`);
        }
        await this.playersService.findOnePlayerById(idPlayer);
        const player = {
            _id:idPlayer,
        };
        findCategory.players.push(player);
        this.saveData();
    }

    private async create(createCategoryDTO: CreateCategoryDTO) {
        const { category, description, events } = createCategoryDTO;
        const categoryObj: Category = {
            _id: randomUUID(),
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


    private update(findCategory: Category, updateCategory: UpdateCategoryDTO): void {
        const { description } = updateCategory;
        findCategory.description = description;
        this.logger.log(`Category update -> ${JSON.stringify(updateCategory)}`);
        this.saveData();
    }

    // async deletePlayer(_id: string): Promise<void> {
    //     const findPlayer = await this.findPlayer('_id', _id);

    //     this.players = this.players.filter(p => p._id != findPlayer?._id);
    // }

    private async findCategory(param: string, value: any): Promise<Category | undefined> {
        return this.categories.find(p => p[param] == value)
    }

    private findPlayerInCategory(category: Category, idPlayer: string) {
        const findPlayer = category.players?.find(p => p._id === idPlayer);
        return findPlayer ?? false
    }

    private async saveData() {
        await this.myJsonBaseService.writeData(this.categories);
        this.logger.log({ message: 'Salvo sucesso!' });
    }
}

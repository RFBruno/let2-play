import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
    
    private readonly logger = new Logger(CategoriesService.name);
    private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
    private categories: Category[] = [];

    constructor() {
        this.myJsonBaseService.readData().then(data => this.categories = data);
    }
    
    createCategory(createCategoryDTO: CreateCategoryDTO): import("./interfaces/category.interface").Category | PromiseLike<import("./interfaces/category.interface").Category> {
        throw new Error('Method not implemented.');
    }
}

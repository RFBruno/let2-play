import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MyJsonBaseService {
    private filePath!:string;
    
    async readData(basename:string): Promise<any[]> {
        this.filePath = path.resolve(`src/my-json-base/base/${basename}.json`);
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data || '[]');
        } catch (error) {
            console.error('Erro ao ler o arquivo:', error);
            return [];
        }
    }

    async writeData(data: any[]): Promise<void> {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error('Erro ao escrever no arquivo:', error);
        }
    }
}

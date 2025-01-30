import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { randomUUID } from 'crypto';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';

@Injectable()
export class PlayersService {

    private readonly logger = new Logger(PlayersService.name);
    private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
    private players: Player[] = [];

    constructor(){
        this.myJsonBaseService.readData().then(data => this.players = data);
    }

    async findAllPlayers(): Promise<Player[]> {
        this.logger.log(`List -> ${JSON.stringify(this.players)}`);
        return this.players;
    }

    async findOnePlayer(email: string): Promise<Player> {
        const findPlayer = await this.findPlayer(email);
        if (!findPlayer) {
            throw new NotFoundException(`Nenhum jogador encontrado com o e-mail ${email}`);
        }
        return findPlayer;
    }

    async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO;
        const findPlayer = await this.findPlayer(email);
        if (findPlayer) {
            await this.update(findPlayer, createPlayerDTO);
        } else {
            await this.create(createPlayerDTO);
        }

    }

    private async create(createPlayerDTO: CreatePlayerDTO) {
        const { name, phone, email } = createPlayerDTO;
        const player: Player = {
            _id: randomUUID(),
            name,
            phone,
            email,
            positionRanking: 1,
            ranking: "a",
            urlPhoto: "asdf"
        }

        this.logger.log(`createPlayerDTO -> ${JSON.stringify(player)}`)
        this.players.push(player);
        this.saveData();
    }
    
    
    private update(findPlayer: Player, createPlayerDTO: CreatePlayerDTO): void {
        const { name } = createPlayerDTO;
        findPlayer.name = name;
        this.saveData();
    }

    async deletePlayer(email: string): Promise<void> {
        const findPlayer = await this.findPlayer(email);

        this.players = this.players.filter(p => p.email != findPlayer?.email);
    }

    private async findPlayer(email: string): Promise<Player | undefined> {
        return this.players.find(p => p.email == email)
    }

    private async saveData() {
        await this.myJsonBaseService.writeData(this.players);
        this.logger.log({ message: 'Salvo sucesso!'});
    }

}

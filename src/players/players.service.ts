import { CreatePlayerDTO } from './dtos/create-player.dto';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { randomUUID } from 'crypto';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {

    private readonly logger = new Logger(PlayersService.name);
    private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
    private players: Player[] = [];

    constructor(){
        this.myJsonBaseService.readData("players").then(data => this.players = data);
    }

    async findAllPlayers(): Promise<Player[]> {
        this.logger.log(`List -> ${JSON.stringify(this.players)}`);
        return this.players;
    }

    async findOnePlayer(email: string): Promise<Player> {
        const findPlayer = await this.findPlayer('email', email);
        if (!findPlayer) {
            throw new NotFoundException(`Nenhum jogador encontrado com o e-mail ${email}`);
        }
        return findPlayer;
    }

    async findOnePlayerById(_id: string): Promise<Player> {
        const findPlayer = await this.findPlayer('_id', _id);
        if (!findPlayer) {
            throw new NotFoundException(`Nenhum jogador encontrado com id ${_id}`);
        }
        return findPlayer;
    }

    async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = createPlayerDTO;
        const findPlayer = await this.findPlayer('email', email);
        if (findPlayer) {
            throw new BadRequestException('Jogador com e-mail já cadastrado.');
        }

        await this.create(createPlayerDTO);
    }

    async updatePlayer(_id:string, updatePlayerDTO: UpdatePlayerDTO): Promise<void> {
        const findPlayer = await this.findPlayer('_id', _id);
        if (!findPlayer) {
            throw new NotFoundException('Jogador com id não encontrado.');
        }

        await this.update(findPlayer, updatePlayerDTO);

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
    
    
    private update(findPlayer: Player, updatePlayerDTO: UpdatePlayerDTO): void {
        const { name } = updatePlayerDTO;
        findPlayer.name = name;
        this.saveData();
    }

    async deletePlayer(_id: string): Promise<void> {
        const findPlayer = await this.findPlayer('_id', _id);

        this.players = this.players.filter(p => p._id != findPlayer?._id);
    }

    private async findPlayer(param: string, value:any): Promise<Player | undefined> {
        return this.players.find(p => p[param] == value)
    }

    private async saveData() {
        await this.myJsonBaseService.writeData(this.players);
        this.logger.log({ message: 'Salvo sucesso!'});
    }

}

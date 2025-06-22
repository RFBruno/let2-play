import { CategoriesService } from './../categories/categories.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { MyJsonBaseService } from 'src/my-json-base/my-json-base.service';
import { PlayersService } from 'src/players/players.service';
import { randomUUID } from 'crypto';


@Injectable()
export class ChallengeService {
  private readonly logger = new Logger(ChallengeService.name);
  private readonly myJsonBaseService: MyJsonBaseService = new MyJsonBaseService();
  private challenges: Challenge[] = [];

  constructor(private readonly playersService: PlayersService, private readonly categoriesService: CategoriesService) {
    this.myJsonBaseService.readData("challenges").then(data => this.challenges = data);
  }

  async createChallenge(createChallengeDto: CreateChallengeDto) {

    let applicantInMatch = false;

    for (const player of createChallengeDto.players) {
      const findPlayer = await this.playersService.findOnePlayerById(player._id);
      if (!findPlayer) {
        throw new BadRequestException(`O id ${player._id} não é um jogador!`)
      }

      if (!applicantInMatch && player._id === createChallengeDto.applicant) {
        applicantInMatch = true;
      }
    }

    if (!applicantInMatch) {
      throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
    }

    const categoryPlayer = await this.categoriesService.findCategoryPlayer(createChallengeDto.applicant);
    if (!categoryPlayer) {
      throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
    }
    // return await this.create(createChallengeDto);
  }

  findAll() {
    this.logger.log(`List -> ${JSON.stringify(this.challenges)}`);
    return this.challenges;
  }

  async findOne(id: string) {
    const findChallenge = await this.findChallenge('_id', id);
    if (!findChallenge) {
      throw new NotFoundException(`Nenhuma desafio encontrado.`);
    }
    return findChallenge;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }

  private async create(createChallengeDto: CreateChallengeDto) {
    const { dateTimeChallenge, applicant, players } = createChallengeDto;
    const challengeObj: Challenge = {
      _id: randomUUID(),
      dateTimeChallenge,
      applicant,
      players: players.map(p => p._id)
    }

    this.logger.log(`createChallengeDto -> ${JSON.stringify(challengeObj)}`)
    this.challenges.push(challengeObj);
    await this.saveData();
    return challengeObj;
  }

  private async findChallenge(param: string, value: any): Promise<Challenge | undefined> {
    return this.challenges.find(p => p[param] == value)
  }

  private async saveData() {
    await this.myJsonBaseService.writeData(this.challenges);
    this.logger.log({ message: 'Salvo sucesso!' });
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { ValidationParamsPipe } from '../common/pipes/validation-params.pipe';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Api } from 'src/util/serve-path';

@Controller(`${Api.APIV1}/players`)
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Get()
    async findAllPlayers(
    ): Promise<Player[]> {
        return await this.playersService.findAllPlayers();
    }

    @Get('/:_id')
    @UsePipes(ValidationPipe)
    async findOnePlayer(
        @Param('_id') _id: string
    ): Promise<Player> {
        return await this.playersService.findOnePlayerById(_id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.playersService.createPlayer(createPlayerDTO);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(@Body() updatePlayer: UpdatePlayerDTO, @Param('_id') _id:string): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayer);
    }

    @Delete('/:_id')
    @UsePipes(ValidationPipe)
    async deletePlayer(
        @Param('_id') _id:string
    ): Promise<void> {
        await this.playersService.deletePlayer(_id);
    }
}

import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService:PlayersService){}

    @Get()
    async findAllPlayers(
        @Query('email') email : string
    ): Promise<Player[] | Player>{
        if(email){
            return await this.playersService.findOnePlayer(email);
        }
        return await this.playersService.findAllPlayers();
    }


    @Post()
    async createUpdatePlayer(@Body() createPlayerDTO:CreatePlayerDTO)
    {   
        const {email} = createPlayerDTO;
        this.playersService.createUpdatePlayer(createPlayerDTO);
    }

    @Delete()
    async deletePlayer(
        @Query('email') email : string
    ):Promise<void>{
        this.playersService.deletePlayer(email);
    }
}

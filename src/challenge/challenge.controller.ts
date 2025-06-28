import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { Api } from 'src/util/serve-path';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidation } from './pipe/challenge-status-validation.pipe';
import { MatchChallengeDto } from './dto/match-challenge.dto';

@Controller(`${Api.APIV1}/challenge`)
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return await this.challengeService.createChallenge(createChallengeDto);
  }

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Get()
  findChallengePlayer(@Query('playerId') id: string) {
    return this.challengeService.findChallengePlayer(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,
    @Body(ChallengeStatusValidation) updateChallengeDto: UpdateChallengeDto) {
    return await this.challengeService.update(id, updateChallengeDto);
  }

  @Patch(':id/match')
  async matchResult(@Param('id') id: string,
    @Body(ValidationPipe) updateMatchDto: MatchChallengeDto) {
    return await this.challengeService.updateMatchChallenge(id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(id);
  }
}

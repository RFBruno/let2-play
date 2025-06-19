import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { PlayersModule } from 'src/players/players.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports:[PlayersModule]
})
export class ChallengeModule {}

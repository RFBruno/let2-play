import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService],
  imports:[PlayersModule,CategoriesModule]
})
export class ChallengeModule {}

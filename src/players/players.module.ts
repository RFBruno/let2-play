import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MyJsonBaseModule } from 'src/my-json-base/my-json-base.module';

@Module({
  imports:[MyJsonBaseModule],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule { }

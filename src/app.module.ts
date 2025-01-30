import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MyJsonBaseService } from './my-json-base/my-json-base.service';
import { MyJsonBaseModule } from './my-json-base/my-json-base.module';

@Module({
  imports: [PlayersModule, MyJsonBaseModule],
  controllers: [],
  providers: [MyJsonBaseService],
})
export class AppModule { }

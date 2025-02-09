import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MyJsonBaseService } from './my-json-base/my-json-base.service';
import { MyJsonBaseModule } from './my-json-base/my-json-base.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PlayersModule, MyJsonBaseModule, CategoriesModule],
  controllers: [],
  providers: [MyJsonBaseService],
})
export class AppModule { }

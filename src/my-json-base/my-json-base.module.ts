import { Module } from '@nestjs/common';
import { MyJsonBaseService } from './my-json-base.service';

@Module({
    providers:[MyJsonBaseService],
    exports:[MyJsonBaseService]
})
export class MyJsonBaseModule {}

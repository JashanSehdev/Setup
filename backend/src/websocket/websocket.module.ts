import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketServices } from './websocket-auth.service.js';


@Module({


  providers: [WebsocketServices],

})
export class UserModule {}

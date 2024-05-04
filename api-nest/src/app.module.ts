import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {EntryController} from "./entry/entry.controller";
import {UserController} from "./user/user.controller";
import {UserService} from "./user/user.service";
import {EntryService} from "./entry/entry.service";
import {DbService} from "./db/db.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, EntryController, UserController],
  providers: [AppService, UserService, EntryService, DbService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { StarsService } from "./stars.service";
import { Star } from "./stars.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandHandlers } from "./handlers";
import { StarsController } from "./stars.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Star]),
    CqrsModule
  ],
  providers: [StarsService, ...CommandHandlers],
  exports: [],
  controllers: [StarsController]
})
export class StarsModule { }
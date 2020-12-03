import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StarCategory } from "./stars-category.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([StarCategory]),
    CqrsModule
  ],
  providers: [],
  exports: [],
  controllers: []
})
export class StarsModule { }
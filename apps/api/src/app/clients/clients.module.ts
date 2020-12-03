import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    CqrsModule
  ],
  providers: [],
  exports: [],
  controllers: []
})
export class ClientsModule { }
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { Profile } from "./profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { ContextModule } from "../context/context.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    CqrsModule,
    CloudinaryModule,
    ContextModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: []
})
export class ProfileModule {}

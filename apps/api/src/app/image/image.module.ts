import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageService } from "./image.service";
import { CqrsModule } from "@nestjs/cqrs";
import { ImageCommandHandlers } from "./handlers";
import { Image } from "./image.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Image]),
        CqrsModule
    ],
    controllers: [],
    providers: [ImageService, ...ImageCommandHandlers],
    exports: []
})
export class ImageModule { }

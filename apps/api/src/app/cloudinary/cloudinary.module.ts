import { Module, } from '@nestjs/common';
import { CloudinaryService } from "./cloudinary.service";

@Module({
    imports: [
    ],
    providers: [CloudinaryService],
    exports: [CloudinaryService],
    controllers: []
})
export class CloudinaryModule { }
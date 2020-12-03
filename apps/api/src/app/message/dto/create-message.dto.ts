import { IsString, Min } from "class-validator";

export class CreateMessageDto {
    constructor(values: Partial<CreateMessageDto>) {
        Object.assign(this, values);
    }

    @IsString()
    roomId: string;

    @IsString()
    userId: string;

    @IsString()
    @Min(1)
    content: string;
}
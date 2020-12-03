import { IsString, IsDate, IsNotEmpty } from "class-validator";

export class CreateRoomDto {
    @IsDate()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    requestedForUserId: string;

    @IsString()
    @IsNotEmpty()
    requestedByUserId: string;

    constructor(values: Partial<CreateRoomDto>) {
        Object.assign(this, values);
    }
}
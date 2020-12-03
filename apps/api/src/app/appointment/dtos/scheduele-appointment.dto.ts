import { IsString, IsDate, IsNotEmpty } from "class-validator";

export class SchedueleAppointmentDto {
    @IsDate()
    @IsNotEmpty()
    schedueledDate: string;

    @IsString()
    @IsNotEmpty()
    requestedById: string;

    @IsString()
    @IsNotEmpty()
    requestedForId: string;

    constructor(values: Partial<SchedueleAppointmentDto>) {
        Object.assign(this, values);
    }
}
import { IsNotEmpty, IsEnum, IsString } from "class-validator";
import { AppointmentStatus } from "../../../../../../libs/models/appointment";

export class UpdateAppointmentDto {
    @IsEnum(AppointmentStatus)
    @IsNotEmpty()
    status: AppointmentStatus;

    @IsString()
    @IsNotEmpty()
    requestedForId: string;

    @IsString()
    @IsNotEmpty()
    appointmentId: string;

    constructor(values: Partial<UpdateAppointmentDto>) {
        Object.assign(this, values);
    }
}
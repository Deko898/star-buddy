import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { CreateRoomCommand } from "../commands";
import { Room } from "../room.entity";
import { RoomService } from "../room.service";
import { JwtService } from "@nestjs/jwt";
import { HttpExceptionFilter } from "../../core/http-exception.filter";
import { getRepository } from "typeorm";
import { RoomAuth } from "../room-auth.entity";
import { FindUserCommand } from "../../user/commands";

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {

    constructor(
        private jwtService: JwtService,
        private readonly roomService: RoomService,
        private commandBus: CommandBus
    ) { }

    public async execute(command: CreateRoomCommand): Promise<Room> {
        const { input } = command;
        try {
            const requestedBy = await this.commandBus.execute(new FindUserCommand(input.requestedByUserId))
            const requestedFor = await this.commandBus.execute(new FindUserCommand(input.requestedForUserId))
            const participants = [requestedBy, requestedFor]
            const access_token = await this.jwtService.signAsync({
                participants: [requestedBy.id, requestedFor.id],
                startDate: input.startDate
            });

            const room = await this.roomService.create({ ...input, participants });

            const roomAuthRepo = getRepository('room_auth');
            const roomAuth = new RoomAuth();
            roomAuth.access_token = access_token;
            roomAuth.room = room;

            await roomAuthRepo.save(roomAuth)
            return room;
        } catch (error) {
            throw new HttpExceptionFilter()
        }
    }
}

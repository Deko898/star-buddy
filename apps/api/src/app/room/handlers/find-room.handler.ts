import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FindRoomCommand } from "../commands";
import { Room } from "../room.entity";
import { RoomService } from "../room.service";

@CommandHandler(FindRoomCommand)
export class FindRoomHandler implements ICommandHandler<FindRoomCommand> {

    constructor(private readonly roomService: RoomService) { }

    public async execute(command: FindRoomCommand): Promise<Room> {
        const { id, input } = command;

        return await this.roomService.findOne(id, input);
    }
}

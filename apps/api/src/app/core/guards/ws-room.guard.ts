import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { CommandBus } from "@nestjs/cqrs";
import { FindRoomCommand } from "../../room/commands/find-room.command";
import { DateUtils } from "../../../../../../libs/common/src/lib/date-utils";

@Injectable()
export class WsRoomGuard implements CanActivate {

    constructor(
        private commandBus: CommandBus
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const { userId, roomId } = client.handshake?.query;

        if (!userId) {
            throw new WsException('No permission');
        }

        if (!roomId) {
            throw new WsException('Room doesent exist');
        }

        try {
            const room = await this.commandBus.execute(new FindRoomCommand(roomId, { relations: ['participants'] }));

            const isParticipant = room.participants.find(p => p.id === userId);

            if (!isParticipant) {
                throw new WsException('No permission');
            }

            if (DateUtils.isBefore(room.startDate)) {
                throw new WsException("You're trying to access meeting in the past");
            }
            return true;
        }
        catch (error) {
            throw new WsException(error.message)
        }
    }
}
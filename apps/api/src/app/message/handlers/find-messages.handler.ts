import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FindMessagesCommand } from "../commands";
import { MessageService } from "../message.service";
import { RoomMessagesDto } from "../dto";

@CommandHandler(FindMessagesCommand)
export class FindMessagesHandler implements ICommandHandler<FindMessagesCommand> {

    constructor(private readonly messageService: MessageService) { }

    public async execute(command: FindMessagesCommand): Promise<RoomMessagesDto> {
        const { input } = command;

        return await this.messageService.findAll(input);
    }
}

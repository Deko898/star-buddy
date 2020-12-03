import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMessageCommand } from "../commands";
import { MessageService } from "../message.service";
import { Message } from "../message.entity";

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {

    constructor(private readonly messageService: MessageService) { }

    public async execute(command: CreateMessageCommand): Promise<Message> {
        const { input } = command;

        return await this.messageService.create(input);
    }
}

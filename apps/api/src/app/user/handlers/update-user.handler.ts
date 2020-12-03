import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../commands";
import { UserService } from "../user.service";
import { User } from "../user.entity";
import { UpdateResult } from "typeorm";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {

    constructor(private readonly userService: UserService) { }

    public async execute(command: UpdateUserCommand): Promise<UpdateResult | User> {
        const { id, partialEntity, options } = command;

        return await this.userService.update(id, partialEntity, options);
    }
}

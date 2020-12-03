import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { FindUserCommand } from "../commands";
import { UserService } from "../user.service";
import { User } from "../user.entity";
import { FindOneOptions } from "typeorm";

@CommandHandler(FindUserCommand)
export class FindUserHandler implements ICommandHandler<FindUserCommand> {

    constructor(private readonly userService: UserService) { }

    public async execute(command: FindUserCommand): Promise<User> {
        const { id, input } = command;

        return await this.userService.findOne(id, input);
    }
}

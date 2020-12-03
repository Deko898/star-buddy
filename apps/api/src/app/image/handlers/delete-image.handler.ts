import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteImageCommand } from "../commands";
import { UpdateResult, DeleteResult } from "typeorm";
import { ImageService } from "../image.service";

@CommandHandler(DeleteImageCommand)
export class DeleteImageHandler implements ICommandHandler<DeleteImageCommand> {

    constructor(private readonly iamgeService: ImageService) { }

    public async execute(command: DeleteImageCommand): Promise<DeleteResult> {
        const { input } = command;

        return await this.iamgeService.delete(input);
    }
}

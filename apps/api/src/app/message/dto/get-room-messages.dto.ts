import { IsString } from "class-validator";
import { PaginationParams, OrderType } from "../../core/interfaces";
import { Message } from "../message.entity";

export class GetRoomMessagesDto extends PaginationParams<Message> {
    constructor(values: Partial<GetRoomMessagesDto>) {
        super();
        Object.assign(this, values);
    }

    @IsString()
    roomId: string;

    order?: { user?: OrderType; room?: OrderType; readonly roomId?: OrderType; content?: OrderType; id?: OrderType; dateCreated?: OrderType; dateUpdated?: OrderType; };
}
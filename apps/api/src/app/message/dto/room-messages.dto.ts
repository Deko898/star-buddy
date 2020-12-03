import { IPagination } from "../../core/interfaces";
import { Message } from "../message.entity";

export class RoomMessagesDto implements IPagination<Message> {
    readonly items: Message[];
    readonly total: number;
  }
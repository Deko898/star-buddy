import { IPagination } from "../../core/interfaces";
import { Star } from "../stars.entity";

export class StartList implements IPagination<Star> {
    readonly items: Star[];
    readonly total: number;
  }
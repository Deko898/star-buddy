import { Star } from "../stars.entity";
import { IsOptional, IsString, IsBoolean, IsArray } from "class-validator";
import { PaginationParams, OrderType } from "../../core/interfaces";
import { Transform, Type } from "class-transformer/decorators";

export class GetAllStarsDto extends PaginationParams<Star> {

    @IsString()
    @IsOptional()
    username: string;

    @IsOptional()
    dateCreated?: OrderType;

    @Transform((val: string) => {
        return (typeof val === "string" && val.length) ? [val] : val
    })
    @IsOptional()
    categoryIds?: string[];

    @Type(() => Boolean)
    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;

    @IsOptional()
    @Transform((val: string) => ({ dateCreated: val === OrderType.ASC ? OrderType.ASC : OrderType.DESC }))
    readonly order = {
        dateCreated: OrderType.DESC
    };

    constructor(values: Partial<GetAllStarsDto>) {
        super();
        Object.assign(this, values);
    }
}
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { AfterLoad } from 'typeorm';

export enum OrderType {
	DESC = 'DESC',
	ASC = 'ASC'
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T> {
	/**
	 * Pagination limit
	 */
	@ApiPropertyOptional({ type: Number, minimum: 0, maximum: 50 })
	@IsOptional()
	@Min(0)
	@Max(50)
	@Transform((val: string) => parseInt(val, 10))
	readonly take = 10;

	/**
	 * Pagination offset
	 */
	@ApiPropertyOptional({ type: Number, minimum: 0 })
	@IsOptional()
	@Min(0)
	@Transform((val: string) => parseInt(val, 10))
	readonly page = 0;

	
	/**
	 * OrderBy
	 */
	@ApiPropertyOptional()
	@IsOptional()
	abstract readonly order?: { [P in keyof T]?: OrderType };
}

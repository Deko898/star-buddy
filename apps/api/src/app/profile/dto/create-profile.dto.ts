import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Gender } from '../../../../../../libs/models';

export class CreateProfileDto {
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender = Gender.UNKNOW;
}

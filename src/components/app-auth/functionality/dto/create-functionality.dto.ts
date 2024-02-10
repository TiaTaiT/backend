import { IsArray, IsString } from 'class-validator';

export class CreateFunctionalityDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  hardwares: number[];
}

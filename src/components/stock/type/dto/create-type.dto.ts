import { IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  description: string;
}

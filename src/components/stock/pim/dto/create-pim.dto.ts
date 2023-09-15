import { IsString } from 'class-validator';

export class CreatePimDto {
  @IsString()
  name: string;

  @IsString()
  content: string;
}

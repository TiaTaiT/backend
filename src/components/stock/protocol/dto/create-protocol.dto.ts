import { IsString } from 'class-validator';

export class CreateProtocolDto {
  @IsString()
  name!: string;
}

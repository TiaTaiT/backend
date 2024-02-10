import { IsArray, IsString } from 'class-validator';

export class CreateHardwareDto {
  @IsString()
  serial: string;

  @IsString()
  description: string;

  @IsArray()
  functionalities: number[];
}

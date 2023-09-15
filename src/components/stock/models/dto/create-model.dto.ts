import { IsOptional, IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  description: string; // Some description for identification

  @IsOptional()
  @IsString()
  model3Dpath?: string; // [note: 'path to 3D model of device']

  @IsOptional()
  @IsString()
  model2Dpath?: string; // [note: 'path to 2D model of device']

  @IsOptional()
  @IsString()
  image?: string; // [note: 'preview image of device']
}

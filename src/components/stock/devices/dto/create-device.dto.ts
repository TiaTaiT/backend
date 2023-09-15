import { PlainObject } from '@mikro-orm/core';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto extends PlainObject {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  alterName: string = '';

  @IsString()
  description: string = '';

  @IsString()
  @IsOptional()
  vendorCode: string = '';

  @IsBoolean()
  canHasChildren!: boolean;

  @IsBoolean()
  virtual!: boolean;

  @IsString()
  @IsOptional()
  erpCode: string = '';

  @IsNumber()
  @IsOptional()
  length?: number; // float [note: 'Device length in meters']

  @IsNumber()
  @IsOptional()
  width?: number; // float [note: 'Device width in meters']

  @IsNumber()
  @IsOptional()
  height?: number; // float [note: 'Device height in meters']

  @IsNumber()
  @IsOptional()
  status: number;

  @IsNumber()
  @IsOptional()
  type?: number;

  @IsNumber()
  @IsOptional()
  brand?: number;

  @IsNumber()
  @IsOptional()
  model?: number;

  @IsNumber()
  @IsOptional()
  pim?: number;
}

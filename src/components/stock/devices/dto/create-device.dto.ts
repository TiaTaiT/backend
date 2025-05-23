import { PlainObject } from '@mikro-orm/core';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Pim } from '../../pim/entities/pim.entity';
import { Model } from '../../models/entities/model.entity';
import { Brand } from '../../brand/entities/brand.entity';
import { Type } from '../../type/entities/type.entity';
import { Status } from '../../status/entities/status.entity';
import { Document } from '../../document/entities/document.entity';

export class CreateDeviceDto extends PlainObject {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  alterName?: string = '';

  @IsString()
  description: string = '';

  @IsString()
  @IsOptional()
  vendorCode?: string = '';

  @IsBoolean()
  canHasChildren!: boolean;

  @IsBoolean()
  virtual!: boolean;

  @IsArray()
  @IsOptional()
  protocols?: number[];

  @IsString()
  @IsOptional()
  erpCode?: string = '';

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
  status: Status;

  @IsNumber()
  @IsOptional()
  type?: Type;

  @IsNumber()
  @IsOptional()
  brand?: Brand;

  @IsNumber()
  @IsOptional()
  model?: Model;

  @IsNumber()
  @IsOptional()
  pim?: Pim;

}

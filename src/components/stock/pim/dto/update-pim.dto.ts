import { PartialType } from '@nestjs/mapped-types';
import { CreatePimDto } from './create-pim.dto';

export class UpdatePimDto extends PartialType(CreatePimDto) {}

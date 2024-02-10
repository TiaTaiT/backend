import { PartialType } from '@nestjs/mapped-types';
import { CreateProtocolDto } from './create-protocol.dto';

export class ReturnProtocolDto extends PartialType(CreateProtocolDto) {
  id: number;
}

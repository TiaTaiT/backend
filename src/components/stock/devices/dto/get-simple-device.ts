import { PlainObject } from '@mikro-orm/core';

export class SimpleDeviceDto extends PlainObject {
  id: number;
  name: string;
  alterName: string;
  description: string;
  deviceType: string;
  protocols: string[];
}

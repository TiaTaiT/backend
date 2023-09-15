import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Brand {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

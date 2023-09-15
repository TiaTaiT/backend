import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Status {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}

import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Type {
  @PrimaryKey()
  id: number;

  @Property()
  @Unique()
  description!: string;

  constructor(description: string) {
    this.description = description;
  }
}

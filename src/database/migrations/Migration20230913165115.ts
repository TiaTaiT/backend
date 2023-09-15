import { Migration } from '@mikro-orm/migrations';

export class Migration20230913165115 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "brand" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "type" ("id" serial primary key, "description" varchar(255) not null);');
    this.addSql('alter table "type" add constraint "type_description_unique" unique ("description");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "brand" cascade;');

    this.addSql('drop table if exists "type" cascade;');
  }

}

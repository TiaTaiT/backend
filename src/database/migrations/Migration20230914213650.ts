import { Migration } from '@mikro-orm/migrations';

export class Migration20230914213650 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "document" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "creator_id" int not null, "updated_at" timestamptz(0) not null, "updator_id" int not null);');

    this.addSql('alter table "document" add constraint "document_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "document" add constraint "document_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "document" cascade;');
  }

}

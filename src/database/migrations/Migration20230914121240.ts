import { Migration } from '@mikro-orm/migrations';

export class Migration20230914121240 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "model" ("id" serial primary key, "description" varchar(255) not null, "model3dpath" varchar(255) not null, "model2dpath" varchar(255) not null, "image" varchar(255) not null, "created_at" timestamptz(0) not null, "creator_id_id" int not null, "updated_at" timestamptz(0) not null, "updator_id_id" int not null);');

    this.addSql('alter table "model" add constraint "model_creator_id_id_foreign" foreign key ("creator_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "model" add constraint "model_updator_id_id_foreign" foreign key ("updator_id_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "device" add column "length" real not null, add column "width" real not null, add column "height" real not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "model" cascade;');

    this.addSql('alter table "device" drop column "length";');
    this.addSql('alter table "device" drop column "width";');
    this.addSql('alter table "device" drop column "height";');
  }

}

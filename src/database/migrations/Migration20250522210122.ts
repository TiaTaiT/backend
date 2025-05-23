import { Migration } from '@mikro-orm/migrations';

export class Migration20250522210122 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "replacer" drop constraint "replacer_item_id_foreign";`);

    this.addSql(`alter table "replacer" drop constraint "replacer_new_item_id_foreign";`);

    this.addSql(`create table "document" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz not null, "creator_id" int not null, "updated_at" timestamptz not null, "updater_id" int not null);`);
    this.addSql(`alter table "document" add constraint "document_name_unique" unique ("name");`);

    this.addSql(`alter table "document" add constraint "document_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "document" add constraint "document_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade;`);

    this.addSql(`drop table if exists "replacer" cascade;`);

    this.addSql(`drop table if exists "tree_item" cascade;`);

    this.addSql(`drop table if exists "tree_node" cascade;`);

    this.addSql(`alter table "device" drop column "document";`);

    this.addSql(`drop type "category";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create type "category" as enum ('root', 'folder', 'project', 'cabinet', 'device', 'section', 'group');`);
    this.addSql(`create table "replacer" ("item_id" int4 not null, "new_item_id" int4 null, "description" varchar(255) not null, "created_at" timestamptz(6) not null, "creator_id" int4 not null, "updated_at" timestamptz(6) not null, "updater_id" int4 not null, constraint "replacer_pkey" primary key ("item_id"));`);

    this.addSql(`create table "tree_item" ("id" serial primary key, "name" varchar(255) null, "category" "category" not null, "device_id" int4 null, "created_at" timestamptz(6) not null, "creator_id" int4 not null, "updated_at" timestamptz(6) not null, "updater_id" int4 not null, "amount" int4 null, "is_grouped" bool not null);`);

    this.addSql(`create table "tree_node" ("id" serial primary key, "children" jsonb null);`);

    this.addSql(`alter table "replacer" add constraint "replacer_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade on delete no action;`);
    this.addSql(`alter table "replacer" add constraint "replacer_item_id_foreign" foreign key ("item_id") references "tree_item" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "replacer" add constraint "replacer_new_item_id_foreign" foreign key ("new_item_id") references "tree_item" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "replacer" add constraint "replacer_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade on delete no action;`);

    this.addSql(`alter table "tree_item" add constraint "tree_item_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade on delete no action;`);
    this.addSql(`alter table "tree_item" add constraint "tree_item_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "tree_item" add constraint "tree_item_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade on delete no action;`);

    this.addSql(`drop table if exists "document" cascade;`);

    this.addSql(`alter table "device" add column "document" varchar(255) null;`);
  }

}

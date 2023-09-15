import { Migration } from '@mikro-orm/migrations';

export class Migration20230912134023 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "status" ("id" serial primary key, "name" varchar(255) not null);');

    this.addSql('create table "device" ("id" serial primary key, "name" varchar(255) not null, "alter_name" varchar(255) not null, "description" varchar(255) not null, "vendor_code" varchar(255) not null, "can_has_children" boolean not null, "erp_code" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id_id" int not null, "status_id_id" int not null);');
    this.addSql('alter table "device" add constraint "device_erp_code_unique" unique ("erp_code");');

    this.addSql('alter table "device" add constraint "device_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_status_id_id_foreign" foreign key ("status_id_id") references "status" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_status_id_id_foreign";');

    this.addSql('drop table if exists "status" cascade;');

    this.addSql('drop table if exists "device" cascade;');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20230922181712 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "protocol" ("id" serial primary key, "name" varchar(255) not null);');
    this.addSql('alter table "protocol" add constraint "protocol_name_unique" unique ("name");');

    this.addSql('create table "device_protocols" ("device_id" int not null, "protocol_id" int not null, constraint "device_protocols_pkey" primary key ("device_id", "protocol_id"));');

    this.addSql('alter table "device_protocols" add constraint "device_protocols_device_id_foreign" foreign key ("device_id") references "device" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "device_protocols" add constraint "device_protocols_protocol_id_foreign" foreign key ("protocol_id") references "protocol" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device_protocols" drop constraint "device_protocols_protocol_id_foreign";');

    this.addSql('drop table if exists "protocol" cascade;');

    this.addSql('drop table if exists "device_protocols" cascade;');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20240128171559 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "functionality" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "functionality" add constraint "functionality_name_unique" unique ("name");');

    this.addSql('create table "hardware" ("id" serial primary key, "serial" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "hardware" add constraint "hardware_serial_unique" unique ("serial");');

    this.addSql('create table "hardware_functionalities" ("hardware_id" int not null, "functionality_id" int not null, constraint "hardware_functionalities_pkey" primary key ("hardware_id", "functionality_id"));');

    this.addSql('alter table "hardware_functionalities" add constraint "hardware_functionalities_hardware_id_foreign" foreign key ("hardware_id") references "hardware" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "hardware_functionalities" add constraint "hardware_functionalities_functionality_id_foreign" foreign key ("functionality_id") references "functionality" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "hardware_functionalities" drop constraint "hardware_functionalities_functionality_id_foreign";');

    this.addSql('alter table "hardware_functionalities" drop constraint "hardware_functionalities_hardware_id_foreign";');

    this.addSql('drop table if exists "functionality" cascade;');

    this.addSql('drop table if exists "hardware" cascade;');

    this.addSql('drop table if exists "hardware_functionalities" cascade;');
  }

}

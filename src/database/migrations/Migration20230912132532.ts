import { Migration } from '@mikro-orm/migrations';

export class Migration20230912132532 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null);');
    this.addSql('alter table "role" add constraint "role_name_unique" unique ("name");');

    this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "avatar" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "user_roles" ("user_id" int not null, "role_id" int not null, constraint "user_roles_pkey" primary key ("user_id", "role_id"));');

    this.addSql('alter table "user_roles" add constraint "user_roles_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_roles" add constraint "user_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_roles" drop constraint "user_roles_role_id_foreign";');

    this.addSql('alter table "user_roles" drop constraint "user_roles_user_id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_roles" cascade;');
  }

}

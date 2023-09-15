import { Migration } from '@mikro-orm/migrations';

export class Migration20230915174153 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_type_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_brand_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_model_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_pim_id_foreign";');

    this.addSql('alter table "device" alter column "type_id" type int using ("type_id"::int);');
    this.addSql('alter table "device" alter column "type_id" drop not null;');
    this.addSql('alter table "device" alter column "brand_id" type int using ("brand_id"::int);');
    this.addSql('alter table "device" alter column "brand_id" drop not null;');
    this.addSql('alter table "device" alter column "model_id" type int using ("model_id"::int);');
    this.addSql('alter table "device" alter column "model_id" drop not null;');
    this.addSql('alter table "device" alter column "pim_id" type int using ("pim_id"::int);');
    this.addSql('alter table "device" alter column "pim_id" drop not null;');
    this.addSql('alter table "device" add constraint "device_type_id_foreign" foreign key ("type_id") references "status" ("id") on update cascade on delete set null;');
    this.addSql('alter table "device" add constraint "device_brand_id_foreign" foreign key ("brand_id") references "brand" ("id") on update cascade on delete set null;');
    this.addSql('alter table "device" add constraint "device_model_id_foreign" foreign key ("model_id") references "model" ("id") on update cascade on delete set null;');
    this.addSql('alter table "device" add constraint "device_pim_id_foreign" foreign key ("pim_id") references "pim" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_type_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_brand_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_model_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_pim_id_foreign";');

    this.addSql('alter table "device" alter column "type_id" type int using ("type_id"::int);');
    this.addSql('alter table "device" alter column "type_id" set not null;');
    this.addSql('alter table "device" alter column "brand_id" type int using ("brand_id"::int);');
    this.addSql('alter table "device" alter column "brand_id" set not null;');
    this.addSql('alter table "device" alter column "model_id" type int using ("model_id"::int);');
    this.addSql('alter table "device" alter column "model_id" set not null;');
    this.addSql('alter table "device" alter column "pim_id" type int using ("pim_id"::int);');
    this.addSql('alter table "device" alter column "pim_id" set not null;');
    this.addSql('alter table "device" add constraint "device_type_id_foreign" foreign key ("type_id") references "status" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_brand_id_foreign" foreign key ("brand_id") references "brand" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_model_id_foreign" foreign key ("model_id") references "model" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_pim_id_foreign" foreign key ("pim_id") references "pim" ("id") on update cascade;');
  }

}

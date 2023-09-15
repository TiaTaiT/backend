import { Migration } from '@mikro-orm/migrations';

export class Migration20230915163129 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_user_id_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_status_id_id_foreign";');

    this.addSql('alter table "device" add column "virtual" boolean not null, add column "creator_id" int not null, add column "updator_id" int not null, add column "status_id" int not null, add column "type_id" int not null, add column "brand_id" int not null, add column "model_id" int not null, add column "pim_id" int not null;');
    this.addSql('alter table "device" alter column "alter_name" type varchar(255) using ("alter_name"::varchar(255));');
    this.addSql('alter table "device" alter column "alter_name" set default \'\';');
    this.addSql('alter table "device" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "device" alter column "description" set default \'\';');
    this.addSql('alter table "device" alter column "vendor_code" type varchar(255) using ("vendor_code"::varchar(255));');
    this.addSql('alter table "device" alter column "vendor_code" set default \'\';');
    this.addSql('alter table "device" alter column "erp_code" type varchar(255) using ("erp_code"::varchar(255));');
    this.addSql('alter table "device" alter column "erp_code" set default \'\';');
    this.addSql('alter table "device" alter column "length" type real using ("length"::real);');
    this.addSql('alter table "device" alter column "length" set default 0;');
    this.addSql('alter table "device" alter column "width" type real using ("width"::real);');
    this.addSql('alter table "device" alter column "width" set default 0;');
    this.addSql('alter table "device" alter column "height" type real using ("height"::real);');
    this.addSql('alter table "device" alter column "height" set default 0;');
    this.addSql('alter table "device" add constraint "device_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_status_id_foreign" foreign key ("status_id") references "status" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_type_id_foreign" foreign key ("type_id") references "status" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_brand_id_foreign" foreign key ("brand_id") references "brand" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_model_id_foreign" foreign key ("model_id") references "model" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_pim_id_foreign" foreign key ("pim_id") references "pim" ("id") on update cascade;');
    this.addSql('alter table "device" drop column "user_id_id";');
    this.addSql('alter table "device" drop column "status_id_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_creator_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_updator_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_status_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_type_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_brand_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_model_id_foreign";');
    this.addSql('alter table "device" drop constraint "device_pim_id_foreign";');

    this.addSql('alter table "device" add column "user_id_id" int not null, add column "status_id_id" int not null;');
    this.addSql('alter table "device" alter column "alter_name" drop default;');
    this.addSql('alter table "device" alter column "alter_name" type varchar(255) using ("alter_name"::varchar(255));');
    this.addSql('alter table "device" alter column "description" drop default;');
    this.addSql('alter table "device" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "device" alter column "vendor_code" drop default;');
    this.addSql('alter table "device" alter column "vendor_code" type varchar(255) using ("vendor_code"::varchar(255));');
    this.addSql('alter table "device" alter column "erp_code" drop default;');
    this.addSql('alter table "device" alter column "erp_code" type varchar(255) using ("erp_code"::varchar(255));');
    this.addSql('alter table "device" alter column "length" drop default;');
    this.addSql('alter table "device" alter column "length" type real using ("length"::real);');
    this.addSql('alter table "device" alter column "width" drop default;');
    this.addSql('alter table "device" alter column "width" type real using ("width"::real);');
    this.addSql('alter table "device" alter column "height" drop default;');
    this.addSql('alter table "device" alter column "height" type real using ("height"::real);');
    this.addSql('alter table "device" add constraint "device_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "device" add constraint "device_status_id_id_foreign" foreign key ("status_id_id") references "status" ("id") on update cascade;');
    this.addSql('alter table "device" drop column "virtual";');
    this.addSql('alter table "device" drop column "creator_id";');
    this.addSql('alter table "device" drop column "updator_id";');
    this.addSql('alter table "device" drop column "status_id";');
    this.addSql('alter table "device" drop column "type_id";');
    this.addSql('alter table "device" drop column "brand_id";');
    this.addSql('alter table "device" drop column "model_id";');
    this.addSql('alter table "device" drop column "pim_id";');
  }

}

import { Migration } from '@mikro-orm/migrations';

export class Migration20231224194019 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "pim" drop constraint "pim_updator_id_foreign";');

    this.addSql('alter table "model" drop constraint "model_updator_id_foreign";');

    this.addSql('alter table "document" drop constraint "document_updator_id_foreign";');

    this.addSql('alter table "device" drop constraint "device_updator_id_foreign";');

    this.addSql('alter table "pim" rename column "updator_id" to "updater_id";');
    this.addSql('alter table "pim" add constraint "pim_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "model" rename column "updator_id" to "updater_id";');
    this.addSql('alter table "model" add constraint "model_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "document" rename column "updator_id" to "updater_id";');
    this.addSql('alter table "document" add constraint "document_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "device" rename column "updator_id" to "updater_id";');
    this.addSql('alter table "device" add constraint "device_updater_id_foreign" foreign key ("updater_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pim" drop constraint "pim_updater_id_foreign";');

    this.addSql('alter table "model" drop constraint "model_updater_id_foreign";');

    this.addSql('alter table "document" drop constraint "document_updater_id_foreign";');

    this.addSql('alter table "device" drop constraint "device_updater_id_foreign";');

    this.addSql('alter table "pim" rename column "updater_id" to "updator_id";');
    this.addSql('alter table "pim" add constraint "pim_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "model" rename column "updater_id" to "updator_id";');
    this.addSql('alter table "model" add constraint "model_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "document" rename column "updater_id" to "updator_id";');
    this.addSql('alter table "document" add constraint "document_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "device" rename column "updater_id" to "updator_id";');
    this.addSql('alter table "device" add constraint "device_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');
  }

}

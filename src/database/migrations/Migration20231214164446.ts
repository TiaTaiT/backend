import { Migration } from '@mikro-orm/migrations';

export class Migration20231214164446 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_type_id_foreign";');

    this.addSql('alter table "device" add constraint "device_type_id_foreign" foreign key ("type_id") references "type" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" drop constraint "device_type_id_foreign";');

    this.addSql('alter table "device" add constraint "device_type_id_foreign" foreign key ("type_id") references "status" ("id") on update cascade on delete set null;');
  }

}

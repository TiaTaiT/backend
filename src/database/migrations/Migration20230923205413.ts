import { Migration } from '@mikro-orm/migrations';

export class Migration20230923205413 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" drop column "has_serial";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" add column "has_serial" boolean not null default false;');
  }

}

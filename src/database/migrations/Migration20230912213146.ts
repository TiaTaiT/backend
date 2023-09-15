import { Migration } from '@mikro-orm/migrations';

export class Migration20230912213146 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "status" add constraint "status_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "status" drop constraint "status_name_unique";');
  }

}

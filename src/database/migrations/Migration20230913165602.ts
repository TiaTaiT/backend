import { Migration } from '@mikro-orm/migrations';

export class Migration20230913165602 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "brand" add constraint "brand_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "brand" drop constraint "brand_name_unique";');
  }

}

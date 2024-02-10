import { Migration } from '@mikro-orm/migrations';

export class Migration20230921183918 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "document" drop column "description";');
    this.addSql('alter table "document" add constraint "document_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "document" add column "description" varchar(255) not null;');
    this.addSql('alter table "document" drop constraint "document_name_unique";');
  }

}

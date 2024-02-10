import { Migration } from '@mikro-orm/migrations';

export class Migration20231008212128 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "device" alter column "erp_code" drop default;');
    this.addSql('alter table "device" alter column "erp_code" type varchar(255) using ("erp_code"::varchar(255));');
    this.addSql('alter table "device" alter column "erp_code" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "device" alter column "erp_code" type varchar(255) using ("erp_code"::varchar(255));');
    this.addSql('alter table "device" alter column "erp_code" set default \'\';');
    this.addSql('alter table "device" alter column "erp_code" set not null;');
  }

}

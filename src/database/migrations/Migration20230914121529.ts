import { Migration } from '@mikro-orm/migrations';

export class Migration20230914121529 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "model" drop constraint "model_creator_id_id_foreign";');
    this.addSql('alter table "model" drop constraint "model_updator_id_id_foreign";');

    this.addSql('alter table "model" add column "creator_id" int not null, add column "updator_id" int not null;');
    this.addSql('alter table "model" add constraint "model_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "model" add constraint "model_updator_id_foreign" foreign key ("updator_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "model" drop column "creator_id_id";');
    this.addSql('alter table "model" drop column "updator_id_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "model" drop constraint "model_creator_id_foreign";');
    this.addSql('alter table "model" drop constraint "model_updator_id_foreign";');

    this.addSql('alter table "model" add column "creator_id_id" int not null, add column "updator_id_id" int not null;');
    this.addSql('alter table "model" add constraint "model_creator_id_id_foreign" foreign key ("creator_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "model" add constraint "model_updator_id_id_foreign" foreign key ("updator_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "model" drop column "creator_id";');
    this.addSql('alter table "model" drop column "updator_id";');
  }

}

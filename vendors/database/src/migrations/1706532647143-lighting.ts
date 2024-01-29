import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706532647143 implements MigrationInterface {
  name = "Lighting1706532647143";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_browser_book_mark\` ADD \`bookMarkIndex\` int NOT NULL COMMENT '书签index'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_browser_book_mark\` DROP COLUMN \`bookMarkIndex\``);
  }
}

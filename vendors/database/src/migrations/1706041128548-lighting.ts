import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706041128548 implements MigrationInterface {
  name = "Lighting1706041128548";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` ADD \`content\` longtext NOT NULL COMMENT '评价内容'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP COLUMN \`content\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` ADD \`content\` varchar(255) NOT NULL COMMENT '评价内容'`);
  }
}

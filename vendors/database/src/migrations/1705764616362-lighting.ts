import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705764616362 implements MigrationInterface {
  name = "Lighting1705764616362";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` ADD \`duration\` int NOT NULL COMMENT '订阅时长 单位/天'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` DROP COLUMN \`duration\``);
  }
}

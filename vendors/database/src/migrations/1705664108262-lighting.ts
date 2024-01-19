import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705664108262 implements MigrationInterface {
  name = "Lighting1705664108262";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` ADD \`productDiscountPrice\` int NULL COMMENT '商品折扣价 单位分'`);
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` ADD \`productStatus\` varchar(255) NOT NULL COMMENT '商品状态' DEFAULT 'up'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` DROP COLUMN \`productStatus\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` DROP COLUMN \`productDiscountPrice\``);
  }
}

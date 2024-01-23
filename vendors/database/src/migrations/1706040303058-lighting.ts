import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706040303058 implements MigrationInterface {
  name = "Lighting1706040303058";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` ADD \`likeCount\` int NOT NULL COMMENT '评论点赞数'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP COLUMN \`likeCount\``);
  }
}

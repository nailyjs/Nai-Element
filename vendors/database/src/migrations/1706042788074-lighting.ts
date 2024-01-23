import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706042788074 implements MigrationInterface {
  name = "Lighting1706042788074";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_control\` ADD \`publicEvaluateLike\` tinyint NOT NULL COMMENT '是否公开商品评论点赞'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_control\` DROP COLUMN \`publicEvaluateLike\``);
  }
}

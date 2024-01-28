import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706446706015 implements MigrationInterface {
  name = "Lighting1706446706015";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_control\` CHANGE \`publicEmail\` \`publicEmail\` tinyint NOT NULL COMMENT '是否公开邮箱' DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_control\` CHANGE \`publicPhone\` \`publicPhone\` tinyint NOT NULL COMMENT '是否公开手机号' DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_control\` CHANGE \`publicEvaluateLike\` \`publicEvaluateLike\` tinyint NOT NULL COMMENT '是否公开商品评论点赞' DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_control\` CHANGE \`publicEvaluateLike\` \`publicEvaluateLike\` tinyint NOT NULL COMMENT '是否公开商品评论点赞'`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user_control\` CHANGE \`publicPhone\` \`publicPhone\` tinyint NOT NULL COMMENT '是否公开手机号'`);
    await queryRunner.query(`ALTER TABLE \`element_user_control\` CHANGE \`publicEmail\` \`publicEmail\` tinyint NOT NULL COMMENT '是否公开邮箱'`);
  }
}

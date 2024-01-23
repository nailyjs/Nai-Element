import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706040358655 implements MigrationInterface {
  name = "Lighting1706040358655";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` CHANGE \`likeCount\` \`likeCount\` int NOT NULL COMMENT '评论点赞数' DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` CHANGE \`likeCount\` \`likeCount\` int NOT NULL COMMENT '评论点赞数'`);
  }
}

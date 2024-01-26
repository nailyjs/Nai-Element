import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706255376627 implements MigrationInterface {
  name = "Lighting1706255376627";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` CHANGE \`phone\` \`phone\` varchar(255) NULL COMMENT '手机号'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` CHANGE \`phone\` \`phone\` varchar(255) NULL COMMENT '手机号码'`);
  }
}

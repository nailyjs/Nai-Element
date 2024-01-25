import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706105182324 implements MigrationInterface {
  name = "Lighting1706105182324";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` ADD \`loginClient\` varchar(255) NULL COMMENT '登录的客户端'`);
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`identifier\` \`identifier\` varchar(255) NULL COMMENT '登录标识符 整个系统该登录类型的唯一标识符'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`identifier\` \`identifier\` varchar(255) NOT NULL COMMENT '登录标识符 整个系统该登录类型的唯一标识符'`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` DROP COLUMN \`loginClient\``);
  }
}

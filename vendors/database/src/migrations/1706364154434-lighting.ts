import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706364154434 implements MigrationInterface {
  name = "Lighting1706364154434";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` ADD \`loginIP\` varchar(255) NULL COMMENT '登录的IP'`);
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` ADD \`loginMethod\` varchar(255) NOT NULL COMMENT '登录的渠道'`);
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`loginType\` \`loginType\` varchar(255) NOT NULL COMMENT '登录设备类型'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`identifier\` \`identifier\` varchar(255) NULL COMMENT '登录标识符 整个系统该登录类型/设备/渠道的唯一标识符 Web端可为空'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`identifier\` \`identifier\` varchar(255) NULL COMMENT '登录标识符 整个系统该登录类型的唯一标识符'`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` CHANGE \`loginType\` \`loginType\` varchar(255) NOT NULL COMMENT '登录类型'`);
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` DROP COLUMN \`loginMethod\``);
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` DROP COLUMN \`loginIP\``);
  }
}

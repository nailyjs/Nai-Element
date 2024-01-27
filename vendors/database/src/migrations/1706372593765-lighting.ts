import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706372593765 implements MigrationInterface {
  name = "Lighting1706372593765";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` ADD \`loginDeviceName\` varchar(255) NULL COMMENT '登录的设备名'`);
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`loginClient\` \`loginClient\` varchar(255) NULL COMMENT '登录的客户端 是哪个APP'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` CHANGE \`loginClient\` \`loginClient\` varchar(255) NULL COMMENT '登录的客户端'`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` DROP COLUMN \`loginDeviceName\``);
  }
}

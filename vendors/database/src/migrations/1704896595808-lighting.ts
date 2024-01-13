import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704896595808 implements MigrationInterface {
  name = "Lighting1704896595808";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`balance\` \`balance\` int NOT NULL COMMENT '用户余额' DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`point\` \`point\` int NOT NULL COMMENT '用户积分' DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`level\` \`level\` int NOT NULL COMMENT '用户等级' DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`experience\` \`experience\` int NOT NULL COMMENT '用户经验' DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`experience\` \`experience\` int NOT NULL COMMENT '用户经验'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`level\` \`level\` int NOT NULL COMMENT '用户等级'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`point\` \`point\` int NOT NULL COMMENT '用户积分'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`balance\` \`balance\` int NOT NULL COMMENT '用户余额'`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704384847165 implements MigrationInterface {
  name = "Lighting1704384847165";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_value\` (\`userPayID\` int NOT NULL AUTO_INCREMENT COMMENT 'userPayID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`balance\` int NOT NULL COMMENT '用户余额', \`point\` int NOT NULL COMMENT '用户积分', \`level\` int NOT NULL COMMENT '用户等级', \`experience\` int NOT NULL COMMENT '用户经验', PRIMARY KEY (\`userPayID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_user\` (\`userID\` int NOT NULL AUTO_INCREMENT COMMENT '用户ID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`ip\` varchar(255) NOT NULL COMMENT 'IP', \`saying\` varchar(255) NOT NULL COMMENT '个性签名', \`avatar\` varchar(255) NOT NULL COMMENT '头像', \`userPayUserPayID\` int NULL COMMENT 'userPayID', UNIQUE INDEX \`IDX_6922c002d688009b1e107ebb66\` (\`username\`), UNIQUE INDEX \`REL_d07ceec0053e2d37be3fad1da9\` (\`userPayUserPayID\`), PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_d07ceec0053e2d37be3fad1da99\` FOREIGN KEY (\`userPayUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_d07ceec0053e2d37be3fad1da99\``);
    await queryRunner.query(`DROP INDEX \`REL_d07ceec0053e2d37be3fad1da9\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`IDX_6922c002d688009b1e107ebb66\` ON \`element_user\``);
    await queryRunner.query(`DROP TABLE \`element_user\``);
    await queryRunner.query(`DROP TABLE \`element_user_value\``);
  }
}

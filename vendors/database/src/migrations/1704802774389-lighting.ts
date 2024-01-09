import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704802774389 implements MigrationInterface {
  name = "Lighting1704802774389";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_value\` (\`userPayID\` int NOT NULL AUTO_INCREMENT COMMENT 'userPayID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`balance\` int NOT NULL COMMENT '用户余额', \`point\` int NOT NULL COMMENT '用户积分', \`level\` int NOT NULL COMMENT '用户等级', \`experience\` int NOT NULL COMMENT '用户经验', PRIMARY KEY (\`userPayID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_user\` (\`userID\` int NOT NULL AUTO_INCREMENT COMMENT '用户ID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`ip\` varchar(255) NULL COMMENT 'IP', \`saying\` varchar(255) NULL COMMENT '个性签名' DEFAULT '这个人很懒，什么都没有写哦', \`avatar\` varchar(255) NULL COMMENT '头像', \`email\` varchar(255) NULL COMMENT '电子邮件地址', \`phone\` varchar(255) NULL COMMENT '手机号码', \`userValueUserPayID\` int NULL COMMENT 'userPayID', \`userControlUserControlID\` int NULL COMMENT '用户权限ID', UNIQUE INDEX \`IDX_6922c002d688009b1e107ebb66\` (\`username\`), UNIQUE INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` (\`userValueUserPayID\`), UNIQUE INDEX \`REL_1a84918b112cfb7b84700b58b0\` (\`userControlUserControlID\`), PRIMARY KEY (\`userID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_user_control\` (\`userControlID\` int NOT NULL AUTO_INCREMENT COMMENT '用户权限ID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`publicEmail\` tinyint NOT NULL COMMENT '是否公开邮箱', \`publicPhone\` tinyint NOT NULL COMMENT '是否公开手机号', PRIMARY KEY (\`userControlID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_ae91ebc7ebe81b35983b1cf736a\` FOREIGN KEY (\`userValueUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_1a84918b112cfb7b84700b58b0f\` FOREIGN KEY (\`userControlUserControlID\`) REFERENCES \`element_user_control\`(\`userControlID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_1a84918b112cfb7b84700b58b0f\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_ae91ebc7ebe81b35983b1cf736a\``);
    await queryRunner.query(`DROP TABLE \`element_user_control\``);
    await queryRunner.query(`DROP INDEX \`REL_1a84918b112cfb7b84700b58b0\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`IDX_6922c002d688009b1e107ebb66\` ON \`element_user\``);
    await queryRunner.query(`DROP TABLE \`element_user\``);
    await queryRunner.query(`DROP TABLE \`element_user_value\``);
  }
}

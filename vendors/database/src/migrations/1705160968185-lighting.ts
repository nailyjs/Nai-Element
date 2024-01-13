import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705160968185 implements MigrationInterface {
  name = "Lighting1705160968185";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_order\` (\`userOrderID\` int NOT NULL AUTO_INCREMENT COMMENT '订单序号', \`tradeOrderID\` varchar(255) NOT NULL COMMENT '交易订单号', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` varchar(255) NOT NULL COMMENT '金额', \`method\` varchar(255) NOT NULL COMMENT '支付方式', \`status\` varchar(255) NOT NULL COMMENT '状态', \`remark\` varchar(255) NULL COMMENT '备注', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`userOrderID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_order\` ADD CONSTRAINT \`FK_65e30b8beb87721e5c968799ed5\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_order\` DROP FOREIGN KEY \`FK_65e30b8beb87721e5c968799ed5\``);
    await queryRunner.query(`DROP TABLE \`element_user_order\``);
  }
}

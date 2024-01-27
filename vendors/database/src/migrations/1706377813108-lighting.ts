import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706377813108 implements MigrationInterface {
  name = "Lighting1706377813108";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_data\` (\`userDataID\` int NOT NULL AUTO_INCREMENT, \`namespace\` varchar(255) NOT NULL COMMENT '命名空间', \`key\` varchar(255) NOT NULL COMMENT '键', \`value\` varchar(255) NULL COMMENT '值', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`userDataID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_user_app_store_subscribe\` (\`userAppStoreSubscribeID\` int NOT NULL AUTO_INCREMENT, \`originalTransactionID\` varchar(255) NOT NULL COMMENT '原始订单ID', \`userUserID\` int NULL COMMENT '用户ID', UNIQUE INDEX \`IDX_5719f881f9eeecb6caa63a08ce\` (\`originalTransactionID\`), PRIMARY KEY (\`userAppStoreSubscribeID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_data\` ADD CONSTRAINT \`FK_65cc7ecb411fd5aef4c50b92cde\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_app_store_subscribe\` ADD CONSTRAINT \`FK_d16d1591a894f15925e2f59dee2\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_app_store_subscribe\` DROP FOREIGN KEY \`FK_d16d1591a894f15925e2f59dee2\``);
    await queryRunner.query(`ALTER TABLE \`element_user_data\` DROP FOREIGN KEY \`FK_65cc7ecb411fd5aef4c50b92cde\``);
    await queryRunner.query(`DROP INDEX \`IDX_5719f881f9eeecb6caa63a08ce\` ON \`element_user_app_store_subscribe\``);
    await queryRunner.query(`DROP TABLE \`element_user_app_store_subscribe\``);
    await queryRunner.query(`DROP TABLE \`element_user_data\``);
  }
}

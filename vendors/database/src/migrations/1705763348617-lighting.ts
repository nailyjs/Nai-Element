import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705763348617 implements MigrationInterface {
  name = "Lighting1705763348617";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_0f71ee50ed6ee6672e4a190744\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`IDX_6f40039683b02b5fca651d9839\` ON \`element_user\``);
    await queryRunner.query(
      `CREATE TABLE \`element_shop_subscribe\` (\`SubscribeID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`price\` int NOT NULL COMMENT '订阅价格 单位分', \`title\` varchar(255) NOT NULL COMMENT '订阅内容标题', \`introduction\` varchar(255) NOT NULL COMMENT '订阅介绍', \`authorUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`SubscribeID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_subscribe\` ADD CONSTRAINT \`FK_855df0f9d4a8b298aabc9765a60\` FOREIGN KEY (\`authorUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` DROP FOREIGN KEY \`FK_855df0f9d4a8b298aabc9765a60\``);
    await queryRunner.query(`DROP TABLE \`element_shop_subscribe\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6f40039683b02b5fca651d9839\` ON \`element_user\` (\`userControlsUserControlID\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0f71ee50ed6ee6672e4a190744\` ON \`element_user\` (\`userValuesUserPayID\`)`);
  }
}

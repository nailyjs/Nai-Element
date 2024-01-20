import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705763105960 implements MigrationInterface {
  name = "Lighting1705763105960";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_1a84918b112cfb7b84700b58b0f\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_ae91ebc7ebe81b35983b1cf736a\``);
    await queryRunner.query(`DROP INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`REL_1a84918b112cfb7b84700b58b0\` ON \`element_user\``);
    await queryRunner.query(
      `CREATE TABLE \`element_user_subscribe_order\` (\`UserSubscribeID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`subscribedAt\` datetime NOT NULL COMMENT '订阅开始时间/上次订阅续期时间', \`expiredAt\` datetime NOT NULL COMMENT '订阅结束时间', \`status\` varchar(255) NOT NULL COMMENT '订阅状态', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`UserSubscribeID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_subscribe\` (\`SubscribeID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`price\` int NOT NULL COMMENT '订阅价格 单位分', \`title\` varchar(255) NOT NULL COMMENT '订阅内容标题', \`introduction\` varchar(255) NOT NULL COMMENT '订阅介绍', \`authorUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`SubscribeID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userValueUserPayID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userControlUserControlID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userValuesUserPayID\` int NULL COMMENT 'userPayID'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD UNIQUE INDEX \`IDX_0f71ee50ed6ee6672e4a190744\` (\`userValuesUserPayID\`)`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userControlsUserControlID\` int NULL COMMENT '用户权限ID'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD UNIQUE INDEX \`IDX_6f40039683b02b5fca651d9839\` (\`userControlsUserControlID\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0f71ee50ed6ee6672e4a190744\` ON \`element_user\` (\`userValuesUserPayID\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6f40039683b02b5fca651d9839\` ON \`element_user\` (\`userControlsUserControlID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user_subscribe_order\` ADD CONSTRAINT \`FK_6a4a089ff4cb9290a082728e5f2\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_subscribe\` ADD CONSTRAINT \`FK_c5de93f3918ee99990c6a0dc502\` FOREIGN KEY (\`authorUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_0f71ee50ed6ee6672e4a1907444\` FOREIGN KEY (\`userValuesUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_6f40039683b02b5fca651d98398\` FOREIGN KEY (\`userControlsUserControlID\`) REFERENCES \`element_user_control\`(\`userControlID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_6f40039683b02b5fca651d98398\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_0f71ee50ed6ee6672e4a1907444\``);
    await queryRunner.query(`ALTER TABLE \`element_subscribe\` DROP FOREIGN KEY \`FK_c5de93f3918ee99990c6a0dc502\``);
    await queryRunner.query(`ALTER TABLE \`element_user_subscribe_order\` DROP FOREIGN KEY \`FK_6a4a089ff4cb9290a082728e5f2\``);
    await queryRunner.query(`DROP INDEX \`REL_6f40039683b02b5fca651d9839\` ON \`element_user\``);
    await queryRunner.query(`DROP INDEX \`REL_0f71ee50ed6ee6672e4a190744\` ON \`element_user\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP INDEX \`IDX_6f40039683b02b5fca651d9839\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userControlsUserControlID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP INDEX \`IDX_0f71ee50ed6ee6672e4a190744\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userValuesUserPayID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userControlUserControlID\` int NULL COMMENT '用户权限ID'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userValueUserPayID\` int NULL COMMENT 'userPayID'`);
    await queryRunner.query(`DROP TABLE \`element_subscribe\``);
    await queryRunner.query(`DROP TABLE \`element_user_subscribe_order\``);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1a84918b112cfb7b84700b58b0\` ON \`element_user\` (\`userControlUserControlID\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\` (\`userValueUserPayID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_ae91ebc7ebe81b35983b1cf736a\` FOREIGN KEY (\`userValueUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_1a84918b112cfb7b84700b58b0f\` FOREIGN KEY (\`userControlUserControlID\`) REFERENCES \`element_user_control\`(\`userControlID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

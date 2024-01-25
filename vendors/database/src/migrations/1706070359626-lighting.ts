import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706070359626 implements MigrationInterface {
  name = "Lighting1706070359626";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_identifier\` (\`userIdentifierID\` int NOT NULL AUTO_INCREMENT COMMENT '用户标识符ID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`loginType\` varchar(255) NOT NULL COMMENT '登录类型', \`identifier\` varchar(255) NOT NULL COMMENT '登录标识符 整个系统该登录类型的唯一标识符', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`userIdentifierID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_tag\` (\`tagID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tagName\` varchar(255) NOT NULL COMMENT '标签名称', \`tagIntroduction\` varchar(255) NOT NULL COMMENT '标签描述', PRIMARY KEY (\`tagID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_shop_product_product_tags_tag\` (\`shopProductProductID\` int NOT NULL, \`tagTagID\` int NOT NULL, INDEX \`IDX_c647497cbbbfdb6f15590ada14\` (\`shopProductProductID\`), INDEX \`IDX_df7e3263db91aa53f5af18d776\` (\`tagTagID\`), PRIMARY KEY (\`shopProductProductID\`, \`tagTagID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_identifier\` ADD CONSTRAINT \`FK_4496e0b844484bfdfddb266a483\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product_product_tags_tag\` ADD CONSTRAINT \`FK_c647497cbbbfdb6f15590ada144\` FOREIGN KEY (\`shopProductProductID\`) REFERENCES \`element_shop_product\`(\`productID\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product_product_tags_tag\` ADD CONSTRAINT \`FK_df7e3263db91aa53f5af18d776f\` FOREIGN KEY (\`tagTagID\`) REFERENCES \`element_tag\`(\`tagID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product_product_tags_tag\` DROP FOREIGN KEY \`FK_df7e3263db91aa53f5af18d776f\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_product_product_tags_tag\` DROP FOREIGN KEY \`FK_c647497cbbbfdb6f15590ada144\``);
    await queryRunner.query(`ALTER TABLE \`element_user_identifier\` DROP FOREIGN KEY \`FK_4496e0b844484bfdfddb266a483\``);
    await queryRunner.query(`DROP INDEX \`IDX_df7e3263db91aa53f5af18d776\` ON \`element_shop_product_product_tags_tag\``);
    await queryRunner.query(`DROP INDEX \`IDX_c647497cbbbfdb6f15590ada14\` ON \`element_shop_product_product_tags_tag\``);
    await queryRunner.query(`DROP TABLE \`element_shop_product_product_tags_tag\``);
    await queryRunner.query(`DROP TABLE \`element_tag\``);
    await queryRunner.query(`DROP TABLE \`element_user_identifier\``);
  }
}

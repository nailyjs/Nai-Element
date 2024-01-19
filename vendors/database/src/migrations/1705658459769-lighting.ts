import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705658459769 implements MigrationInterface {
  name = "Lighting1705658459769";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_shop_product_tag\` (\`productTagID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productTagName\` varchar(255) NOT NULL COMMENT '标签名称', \`productTagIntroduction\` varchar(255) NOT NULL COMMENT '标签描述', PRIMARY KEY (\`productTagID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_shop_product_properties\` (\`productPropertiesID\` int NOT NULL AUTO_INCREMENT COMMENT '商品属性ID', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productPropertiesName\` varchar(255) NOT NULL COMMENT '商品属性名称', \`productPropertiesIntroduction\` varchar(255) NOT NULL COMMENT '商品属性描述', \`productProductID\` int NULL COMMENT '商品ID', PRIMARY KEY (\`productPropertiesID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_shop_product\` (\`productID\` int NOT NULL AUTO_INCREMENT COMMENT '商品ID', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productName\` varchar(255) NOT NULL COMMENT '商品名称', \`productIntroduction\` varchar(255) NULL COMMENT '商品描述', \`productPrice\` int NOT NULL COMMENT '商品金额 单位分', \`productStock\` int NOT NULL COMMENT '库存数量' DEFAULT '0', \`productSold\` int NOT NULL COMMENT '已售数量' DEFAULT '0', \`productView\` int NOT NULL COMMENT '商品浏览量' DEFAULT '0', PRIMARY KEY (\`productID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_shop_product_product_tags_shop_product_tag\` (\`shopProductProductID\` int NOT NULL, \`shopProductTagProductTagID\` int NOT NULL, INDEX \`IDX_805920e988a9af7a8d16956688\` (\`shopProductProductID\`), INDEX \`IDX_d6902d8964d830326ebd50403c\` (\`shopProductTagProductTagID\`), PRIMARY KEY (\`shopProductProductID\`, \`shopProductTagProductTagID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`balance\` \`balance\` int NOT NULL COMMENT '用户余额 单位分' DEFAULT '0'`);
    await queryRunner.query(`ALTER TABLE \`element_user_order\` DROP COLUMN \`amount\``);
    await queryRunner.query(`ALTER TABLE \`element_user_order\` ADD \`amount\` int NOT NULL COMMENT '金额'`);
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product_properties\` ADD CONSTRAINT \`FK_4ff13a0837494893e83f5b0012d\` FOREIGN KEY (\`productProductID\`) REFERENCES \`element_shop_product\`(\`productID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product_product_tags_shop_product_tag\` ADD CONSTRAINT \`FK_805920e988a9af7a8d169566886\` FOREIGN KEY (\`shopProductProductID\`) REFERENCES \`element_shop_product\`(\`productID\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product_product_tags_shop_product_tag\` ADD CONSTRAINT \`FK_d6902d8964d830326ebd50403cc\` FOREIGN KEY (\`shopProductTagProductTagID\`) REFERENCES \`element_shop_product_tag\`(\`productTagID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product_product_tags_shop_product_tag\` DROP FOREIGN KEY \`FK_d6902d8964d830326ebd50403cc\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_product_product_tags_shop_product_tag\` DROP FOREIGN KEY \`FK_805920e988a9af7a8d169566886\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_product_properties\` DROP FOREIGN KEY \`FK_4ff13a0837494893e83f5b0012d\``);
    await queryRunner.query(`ALTER TABLE \`element_user_order\` DROP COLUMN \`amount\``);
    await queryRunner.query(`ALTER TABLE \`element_user_order\` ADD \`amount\` varchar(255) NOT NULL COMMENT '金额'`);
    await queryRunner.query(`ALTER TABLE \`element_user_value\` CHANGE \`balance\` \`balance\` int NOT NULL COMMENT '用户余额' DEFAULT '0'`);
    await queryRunner.query(`DROP INDEX \`IDX_d6902d8964d830326ebd50403c\` ON \`element_shop_product_product_tags_shop_product_tag\``);
    await queryRunner.query(`DROP INDEX \`IDX_805920e988a9af7a8d16956688\` ON \`element_shop_product_product_tags_shop_product_tag\``);
    await queryRunner.query(`DROP TABLE \`element_shop_product_product_tags_shop_product_tag\``);
    await queryRunner.query(`DROP TABLE \`element_shop_product\``);
    await queryRunner.query(`DROP TABLE \`element_shop_product_properties\``);
    await queryRunner.query(`DROP TABLE \`element_shop_product_tag\``);
  }
}

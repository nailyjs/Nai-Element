import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706011523822 implements MigrationInterface {
  name = "Lighting1706011523822";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_shop_evaluate_like\` (\`evaluateLikeID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`shopEvaluateEvaluateID\` int NULL COMMENT '评价ID', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`evaluateLikeID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_shop_evaluate\` (\`evaluateID\` int NOT NULL AUTO_INCREMENT COMMENT '评价ID', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` varchar(255) NOT NULL COMMENT '评价内容', \`userUserID\` int NULL COMMENT '用户ID', \`productProductID\` int NULL COMMENT '商品ID', PRIMARY KEY (\`evaluateID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user\` CHANGE \`password\` \`password\` varchar(255) NULL COMMENT '密码'`);
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate_like\` ADD CONSTRAINT \`FK_d87b8e16cc1a124181cce4bc8d7\` FOREIGN KEY (\`shopEvaluateEvaluateID\`) REFERENCES \`element_shop_evaluate\`(\`evaluateID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate_like\` ADD CONSTRAINT \`FK_e9a779915f7d0d541bf83952cad\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate\` ADD CONSTRAINT \`FK_1e0d7903046708f0913f0845cfe\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate\` ADD CONSTRAINT \`FK_f1f7161fac634046692e1e246f9\` FOREIGN KEY (\`productProductID\`) REFERENCES \`element_shop_product\`(\`productID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP FOREIGN KEY \`FK_f1f7161fac634046692e1e246f9\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP FOREIGN KEY \`FK_1e0d7903046708f0913f0845cfe\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate_like\` DROP FOREIGN KEY \`FK_e9a779915f7d0d541bf83952cad\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate_like\` DROP FOREIGN KEY \`FK_d87b8e16cc1a124181cce4bc8d7\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL COMMENT '密码'`);
    await queryRunner.query(`DROP TABLE \`element_shop_evaluate\``);
    await queryRunner.query(`DROP TABLE \`element_shop_evaluate_like\``);
  }
}

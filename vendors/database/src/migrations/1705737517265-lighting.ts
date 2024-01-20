import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705737517265 implements MigrationInterface {
  name = "Lighting1705737517265";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` ADD \`userUserID\` int NULL COMMENT '用户ID'`);
    await queryRunner.query(
      `ALTER TABLE \`element_shop_product\` ADD CONSTRAINT \`FK_74d7494db3ad795abcaa00597c1\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` DROP FOREIGN KEY \`FK_74d7494db3ad795abcaa00597c1\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_product\` DROP COLUMN \`userUserID\``);
  }
}

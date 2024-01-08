import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704702647257 implements MigrationInterface {
  name = "Lighting1704702647257";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_user_control\`
       (
           \`userControlID\` int     NOT NULL AUTO_INCREMENT COMMENT '用户权限ID',
           \`createdAt\`     datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP (6),
           \`updatedAt\`     datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6),
           \`publicEmail\`   tinyint NOT NULL COMMENT '是否公开邮箱',
           \`publicPhone\`   tinyint NOT NULL COMMENT '是否公开手机号',
           PRIMARY KEY (\`userControlID\`)
       ) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`element_user\`
        ADD \`userControlUserControlID\` int NULL COMMENT '用户权限ID'`);
    await queryRunner.query(`ALTER TABLE \`element_user\`
        ADD UNIQUE INDEX \`IDX_1a84918b112cfb7b84700b58b0\` (\`userControlUserControlID\`)`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1a84918b112cfb7b84700b58b0\` ON \`element_user\` (\`userControlUserControlID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user\`
          ADD CONSTRAINT \`FK_1a84918b112cfb7b84700b58b0f\` FOREIGN KEY (\`userControlUserControlID\`) REFERENCES \`element_user_control\` (\`userControlID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_1a84918b112cfb7b84700b58b0f\``);
    await queryRunner.query(`DROP INDEX \`REL_1a84918b112cfb7b84700b58b0\` ON \`element_user\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP INDEX \`IDX_1a84918b112cfb7b84700b58b0\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userControlUserControlID\``);
    await queryRunner.query(`DROP TABLE \`element_user_control\``);
  }
}

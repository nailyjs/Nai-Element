import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704528011765 implements MigrationInterface {
  name = "Lighting1704528011765";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_d07ceec0053e2d37be3fad1da99\``);
    await queryRunner.query(`DROP INDEX \`REL_d07ceec0053e2d37be3fad1da9\` ON \`element_user\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userPayUserPayID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`email\` varchar(255) NOT NULL COMMENT '电子邮件地址'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`phone\` varchar(255) NOT NULL COMMENT '手机号码'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userValueUserPayID\` int NULL COMMENT 'userPayID'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD UNIQUE INDEX \`IDX_ae91ebc7ebe81b35983b1cf736\` (\`userValueUserPayID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user\` CHANGE \`saying\` \`saying\` varchar(255) NOT NULL COMMENT '个性签名' DEFAULT '这个人很懒，什么都没有写哦'`,
    );
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\` (\`userValueUserPayID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_ae91ebc7ebe81b35983b1cf736a\` FOREIGN KEY (\`userValueUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP FOREIGN KEY \`FK_ae91ebc7ebe81b35983b1cf736a\``);
    await queryRunner.query(`DROP INDEX \`REL_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` CHANGE \`saying\` \`saying\` varchar(255) NOT NULL COMMENT '个性签名'`);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP INDEX \`IDX_ae91ebc7ebe81b35983b1cf736\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`userValueUserPayID\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`phone\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`element_user\` ADD \`userPayUserPayID\` int NULL COMMENT 'userPayID'`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d07ceec0053e2d37be3fad1da9\` ON \`element_user\` (\`userPayUserPayID\`)`);
    await queryRunner.query(
      `ALTER TABLE \`element_user\` ADD CONSTRAINT \`FK_d07ceec0053e2d37be3fad1da99\` FOREIGN KEY (\`userPayUserPayID\`) REFERENCES \`element_user_value\`(\`userPayID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

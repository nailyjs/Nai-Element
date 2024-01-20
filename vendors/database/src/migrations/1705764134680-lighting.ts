import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705764134680 implements MigrationInterface {
  name = "Lighting1705764134680";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` ADD \`userSubscribeOrdersUserSubscribeID\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`element_user_subscribe_order\` ADD \`shopSubscribeSubscribeID\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`element_shop_subscribe\` ADD CONSTRAINT \`FK_9ae2454ee868dae670bd199823b\` FOREIGN KEY (\`userSubscribeOrdersUserSubscribeID\`) REFERENCES \`element_user_subscribe_order\`(\`UserSubscribeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_user_subscribe_order\` ADD CONSTRAINT \`FK_9ee25fa2c6b7d322ac3cf7615a0\` FOREIGN KEY (\`shopSubscribeSubscribeID\`) REFERENCES \`element_shop_subscribe\`(\`SubscribeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_user_subscribe_order\` DROP FOREIGN KEY \`FK_9ee25fa2c6b7d322ac3cf7615a0\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` DROP FOREIGN KEY \`FK_9ae2454ee868dae670bd199823b\``);
    await queryRunner.query(`ALTER TABLE \`element_user_subscribe_order\` DROP COLUMN \`shopSubscribeSubscribeID\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` DROP COLUMN \`userSubscribeOrdersUserSubscribeID\``);
  }
}

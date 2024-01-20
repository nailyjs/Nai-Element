import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1705764207053 implements MigrationInterface {
  name = "Lighting1705764207053";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` CHANGE \`SubscribeID\` \`subscribeID\` int NOT NULL AUTO_INCREMENT`);
    await queryRunner.query(
      `ALTER TABLE \`element_user_subscribe_order\` CHANGE \`UserSubscribeID\` \`userSubscribeID\` int NOT NULL AUTO_INCREMENT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`element_user_subscribe_order\` CHANGE \`userSubscribeID\` \`UserSubscribeID\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(`ALTER TABLE \`element_shop_subscribe\` CHANGE \`subscribeID\` \`SubscribeID\` int NOT NULL AUTO_INCREMENT`);
  }
}

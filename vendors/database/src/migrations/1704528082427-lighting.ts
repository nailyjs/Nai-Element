import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1704528082427 implements MigrationInterface {
  name = "Lighting1704528082427";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ae91ebc7ebe81b35983b1cf736\` ON \`element_user\` (\`userValueUserPayID\`)`);
  }
}

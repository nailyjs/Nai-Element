import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706038394465 implements MigrationInterface {
  name = "Lighting1706038394465";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_shop_evaluate_closure\` (\`evaluateID_ancestor\` int NOT NULL, \`evaluateID_descendant\` int NOT NULL, INDEX \`IDX_ed5726048d3f9b6c60c487b157\` (\`evaluateID_ancestor\`), INDEX \`IDX_780bcc9f27c49b53704cc54879\` (\`evaluateID_descendant\`), PRIMARY KEY (\`evaluateID_ancestor\`, \`evaluateID_descendant\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` ADD \`parentEvaluateID\` int NULL COMMENT '评价ID'`);
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate\` ADD CONSTRAINT \`FK_6510dcba41e4af90b6c29ca077a\` FOREIGN KEY (\`parentEvaluateID\`) REFERENCES \`element_shop_evaluate\`(\`evaluateID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate_closure\` ADD CONSTRAINT \`FK_ed5726048d3f9b6c60c487b157e\` FOREIGN KEY (\`evaluateID_ancestor\`) REFERENCES \`element_shop_evaluate\`(\`evaluateID\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_shop_evaluate_closure\` ADD CONSTRAINT \`FK_780bcc9f27c49b53704cc54879b\` FOREIGN KEY (\`evaluateID_descendant\`) REFERENCES \`element_shop_evaluate\`(\`evaluateID\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate_closure\` DROP FOREIGN KEY \`FK_780bcc9f27c49b53704cc54879b\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate_closure\` DROP FOREIGN KEY \`FK_ed5726048d3f9b6c60c487b157e\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP FOREIGN KEY \`FK_6510dcba41e4af90b6c29ca077a\``);
    await queryRunner.query(`ALTER TABLE \`element_shop_evaluate\` DROP COLUMN \`parentEvaluateID\``);
    await queryRunner.query(`DROP INDEX \`IDX_780bcc9f27c49b53704cc54879\` ON \`element_shop_evaluate_closure\``);
    await queryRunner.query(`DROP INDEX \`IDX_ed5726048d3f9b6c60c487b157\` ON \`element_shop_evaluate_closure\``);
    await queryRunner.query(`DROP TABLE \`element_shop_evaluate_closure\``);
  }
}

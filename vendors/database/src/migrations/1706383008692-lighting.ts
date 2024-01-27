import { MigrationInterface, QueryRunner } from "typeorm";

export class Lighting1706383008692 implements MigrationInterface {
  name = "Lighting1706383008692";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`element_browser_track\` (\`browserTrackID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`webPageTitle\` varchar(255) NOT NULL, \`webPageLink\` varchar(255) NOT NULL, \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`browserTrackID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`element_browser_book_mark\` (\`browserBookMarkID\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`bookMarkTitle\` varchar(255) NOT NULL COMMENT '书签标题', \`bookMarkIcon\` varchar(255) NOT NULL COMMENT '书签的icon', \`bookMarkColor\` varchar(255) NOT NULL COMMENT '书签的颜色的HEX值', \`bookMarkLink\` varchar(255) NOT NULL COMMENT '书签的链接', \`userUserID\` int NULL COMMENT '用户ID', PRIMARY KEY (\`browserBookMarkID\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_browser_track\` ADD CONSTRAINT \`FK_6e1e637e4f74de02d5f19e58bdf\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`element_browser_book_mark\` ADD CONSTRAINT \`FK_323bb7203b8a2b80c09597e96f8\` FOREIGN KEY (\`userUserID\`) REFERENCES \`element_user\`(\`userID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`element_browser_book_mark\` DROP FOREIGN KEY \`FK_323bb7203b8a2b80c09597e96f8\``);
    await queryRunner.query(`ALTER TABLE \`element_browser_track\` DROP FOREIGN KEY \`FK_6e1e637e4f74de02d5f19e58bdf\``);
    await queryRunner.query(`DROP TABLE \`element_browser_book_mark\``);
    await queryRunner.query(`DROP TABLE \`element_browser_track\``);
  }
}

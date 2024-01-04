import { DataSource } from "typeorm";
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { CommonConfigModule } from "cn.watchrss.element.shared";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export default (async () => {
  @Module({ imports: [CommonConfigModule.forRoot()] })
  class AppModule {}

  const app = await NestFactory.createApplicationContext(AppModule, {
    snapshot: true,
  });
  const configService = app.get(ConfigService);
  const mysql = configService.get("global.datasource.mysql") || {};
  return new DataSource({
    type: "mysql",
    host: mysql.host,
    port: mysql.port,
    username: mysql.username,
    password: mysql.password,
    database: mysql.database,
    entityPrefix: mysql.entityPrefix,
    logging: typeof mysql.logging === "boolean" ? mysql.logging : true,
    entities: [join(process.env.RESOURCE_ROOT, "**/*/cjs/**/*.entity.js")],
    migrations: [join(process.env.VENDOR_ROOT, "database/src/migrations/**/*.ts")],
  });
})();

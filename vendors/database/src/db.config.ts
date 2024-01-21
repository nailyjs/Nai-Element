/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { DataSource } from "typeorm";
import { NestFactory } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { CommonConfigModule } from "cc.naily.element.shared";
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

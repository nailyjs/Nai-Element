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

import { readFileSync } from "fs";
import metadata from "./metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { CommonLogger, EnableSwagger } from "cc.naily.element.shared";
import { join } from "path";

(async function bootstrap() {
  console.clear();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    logger: new CommonLogger(),
    cors: {
      origin: "*",
    },
  });
  app.useLogger(await app.resolve(CommonLogger));
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("shop.port");
  const name = configService.getOrThrow("shop.name");

  // Swagger
  await SwaggerModule.loadPluginMetadata(metadata);
  const [openAPIObject, generate] = EnableSwagger(app, "shop", (builder) => {
    return builder.setTitle(name).setDescription(readFileSync(join(process.env.PROJECT_ROOT, "apps/shop/DESC.md")).toString("utf-8"));
  });
  generate("shop.openapi.json", openAPIObject).then();
  await app.listen(port);
  return app;
})().then(async (app) => {
  new CommonLogger("NestApplication").verbose(`Shop app is running on ${await app.getUrl()}`);
});

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

import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { format } from "prettier";
import { join } from "path";
import { CommonLogger } from "../modules/logger";

export type SwaggerBuilderCallback = (builder: DocumentBuilder) => void;

/**
 * 启用Swagger
 *
 * @param app app
 * @param callback 回调
 * @function EnableSwagger
 * @exports
 */
export function EnableSwagger<App extends INestApplication>(
  app: App,
  callback?: SwaggerBuilderCallback,
): [OpenAPIObject | undefined, (path: string, openapi: OpenAPIObject) => Promise<void>] {
  const configService = app.get(ConfigService);
  const isEnable = configService.get("global.enableSwagger");

  if (isEnable) {
    const defaultBuilder = new DocumentBuilder()
      .addBearerAuth()
      .setVersion("0.0.0")
      .setLicense("UNLICENSED", null)
      .setContact("Zero", "https://naily.cc", "gczgroup@qq.com");
    if (callback) callback(defaultBuilder);
    const openAPIObject = SwaggerModule.createDocument(app, defaultBuilder.build());
    SwaggerModule.setup("docs", app, openAPIObject, {
      jsonDocumentUrl: "docs/swagger.json",
      yamlDocumentUrl: "docs/swagger.yaml",
      explorer: true,
    });
    return [
      openAPIObject,
      async (path, openapi) => {
        const finalPath = join(process.env.RESOURCE_ROOT, "schema/swagger", path);
        const value = await format(JSON.stringify(openapi), { parser: "json" });
        new CommonLogger("PrettierService").log(
          "Formatted swagger file to " + finalPath.replace(process.env.PROJECT_ROOT, "").replace("/resources", "resources"),
        );
        writeFileSync(finalPath, value);
        new CommonLogger("SwaggerGenerate").log(
          "Generate swagger file to " + finalPath.replace(process.env.PROJECT_ROOT, "").replace("/resources", "resources"),
        );
      },
    ];
  }
}

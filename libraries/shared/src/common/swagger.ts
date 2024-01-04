import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import { format } from "prettier";
import { join } from "path";

export type SwaggerBuilderCallback = (builder: DocumentBuilder) => void;

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
        new Logger("PrettierService").log(
          "Formatted swagger file to " + finalPath.replace(process.env.PROJECT_ROOT, "").replace("/resources", "resources"),
        );
        writeFileSync(finalPath, value);
        new Logger("SwaggerGenerate").log(
          "Generate swagger file to " + finalPath.replace(process.env.PROJECT_ROOT, "").replace("/resources", "resources"),
        );
      },
    ];
  }
}

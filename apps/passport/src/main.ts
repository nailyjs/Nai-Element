import metadata from "./metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule } from "@nestjs/swagger";
import { EnableSwagger } from "cn.watchrss.element.shared";
import { readFileSync } from "fs";

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("passport.port");

  // Swagger
  await SwaggerModule.loadPluginMetadata(metadata);
  const [openAPIObject, generate] = EnableSwagger(app, (builder) => {
    return builder.setTitle("Lightning Passport").setDescription(readFileSync("./DESC.md").toString("utf-8"));
  });
  generate("passport.openapi.json", openAPIObject);
  await app.listen(port);
  return app;
})().then(async (app) => {
  new Logger().log(`Passport app is running on ${await app.getUrl()}`);
});

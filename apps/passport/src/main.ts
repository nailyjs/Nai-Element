import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("passport.port");
  await app.listen(port);
  return app;
}
bootstrap().then(async (app) => {
  new Logger().log(`Passport app is running on ${await app.getUrl()}`);
});

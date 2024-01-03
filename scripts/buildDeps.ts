import { execSync } from "child_process";
import { Logger, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { CommonConfigModule } from "cn.watchrss.element.shared";
import { ConfigService } from "@nestjs/config";

async function main() {
  class BuildModule {}
  Module({
    imports: [CommonConfigModule.forRoot()],
  })(BuildModule);
  const app = await NestFactory.createApplicationContext(BuildModule);
  const configService = app.get(ConfigService);
  const commands: string[] = configService.getOrThrow("scripts.buildDeps.commands");
  if (commands instanceof Array) {
    commands.forEach((command) => {
      new Logger("BuildDeps").log(`Executing: ${command}`);
      execSync(command, {
        stdio: "inherit",
      });
      new Logger("BuildDeps").log(`Done: ${command}`);
    });
  }
}

main();

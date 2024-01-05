import { exec } from "child_process";
import { Logger, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { CommonConfigModule } from "cn.watchrss.element.shared";
import { ConfigService } from "@nestjs/config";
import { Listr } from "listr2";

async function main() {
  class BuildModule {}
  Module({
    imports: [CommonConfigModule.forRoot()],
  })(BuildModule);
  const app = await NestFactory.createApplicationContext(BuildModule);
  const configService = app.get(ConfigService);
  const commands: string[] = configService.getOrThrow("scripts.buildDeps.commands");
  if (commands instanceof Array) {
    const tasks = new Listr(
      commands.map((command) => {
        return {
          title: command,
          task: (ctx, renderer) => {
            return new Promise((resolve) => {
              renderer.output = `Running ${command}`;
              const workerProcess = exec(command);
              workerProcess.stdout.on("data", function (data) {
                renderer.output = data;
              });
              workerProcess.stderr.on("data", function (data) {
                renderer.output = data;
              });
              workerProcess.on("close", function () {
                renderer.title = `${command} done`;
                resolve(true);
              });
            });
          },
        };
      }),
      {
        exitOnError: false,
        concurrent: true,
        collectErrors: "minimal",
      },
    );
    try {
      await tasks.run();
    } catch (error) {
      new Logger().error(error);
      console.error(error);
      process.exit();
    }
  } else {
    throw new TypeError("scripts.buildDeps.commands must be an array");
  }
}

main();

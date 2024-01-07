import { getEnvTasks } from "./checkEnv";
import { Module } from "@nestjs/common";
import { exec } from "child_process";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Listr } from "listr2";

new Listr(
  [
    {
      title: "Check Environment",
      task(ctx, renderer) {
        return renderer
          .newListr(getEnvTasks(), {
            rendererOptions: {
              collapseSubtasks: false,
              collapseErrors: false,
              collapseSkips: false,
              showErrorMessage: true,
              showSkipMessage: true,
              showSubtasks: true,
            },
          })
          .run();
      },
    },
    {
      title: "Build All Dependencies",
      async task(ctx, renderer) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { CommonConfigModule } = require("cc.naily.element.shared");
        class BuildModule {}
        Module({
          imports: [CommonConfigModule.forRoot()],
        })(BuildModule);
        const app = await NestFactory.createApplicationContext(BuildModule);
        const configService = app.get(ConfigService);
        const commands: string[] = configService.getOrThrow("scripts.buildDeps.commands");
        if (!(commands instanceof Array)) throw new TypeError("scripts.buildDeps.commands must be an array");
        if (commands.length === 0) throw new Error("scripts.buildDeps.commands must not be empty");
        return renderer
          .newListr(
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
              rendererOptions: {
                collapseSubtasks: false,
                collapseErrors: false,
                collapseSkips: false,
                showErrorMessage: true,
                showSkipMessage: true,
                showSubtasks: true,
              },
            },
          )
          .run();
      },
    },
  ],
  {
    rendererOptions: {
      collapseSubtasks: false,
      collapseErrors: false,
      collapseSkips: false,
      showErrorMessage: true,
      showSkipMessage: true,
      showSubtasks: true,
    },
    concurrent: false,
  },
).run();

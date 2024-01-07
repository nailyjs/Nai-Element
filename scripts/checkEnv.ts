import { exec, execSync } from "child_process";
import { ListrTask } from "listr2";

function checkPnpm() {
  try {
    execSync("pnpm -v", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

function checkShared() {
  try {
    require("cc.naily.element.shared");
    return true;
  } catch (error) {
    return false;
  }
}

export function getEnvTasks(): ListrTask[] {
  return [
    {
      title: "Check pnpm",
      task(ctx, renderer) {
        return new Promise((resolve) => {
          if (checkPnpm()) return resolve(true);
          renderer.title = "pnpm is not installed, try to install...";
          try {
            const worker = exec("npm i -g pnpm");

            worker.on("data", function (data) {
              renderer.title = data;
            });
            worker.stderr.on("data", function (data) {
              renderer.title = data;
            });
            worker.on("close", function () {
              renderer.title = "pnpm installed";
              return resolve(true);
            });
          } catch (error) {
            renderer.title = "pnpm install failed, please install pnpm manually.";
            process.exit();
          }
        });
      },
    },
    {
      title: "Check shared package",
      task(ctx, renderer) {
        return new Promise((resolve) => {
          if (checkShared()) return resolve(true);
          renderer.title = "cc.naily.element.shared is not builded. Try to build...";
          try {
            const worker = exec("pnpm run build:shared");

            worker.on("data", function (data) {
              renderer.title = data;
            });
            worker.stderr.on("data", function (data) {
              renderer.title = data;
            });
            worker.on("close", function () {
              renderer.title = "cc.naily.element.shared builded";
              resolve(true);
            });
          } catch (error) {
            renderer.title = "cc.naily.element.shared build failed. Try to install...";
            try {
              const worker = exec("pnpm install");

              worker.on("data", function (data) {
                renderer.title = data;
              });
              worker.stderr.on("data", function (data) {
                renderer.title = data;
              });
              worker.on("close", function () {
                renderer.title = "cc.naily.element.shared installed";
                resolve(true);
              });
            } catch (error) {
              renderer.title = "cc.naily.element.shared install failed. Please install cc.naily.element.shared manually.";
              process.exit();
            }
          }
        });
      },
    },
  ];
}

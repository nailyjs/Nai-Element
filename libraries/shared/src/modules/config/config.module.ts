import { Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROJECT_ROOT: string;
      RESOURCE_ROOT: string;
      VENDOR_ROOT: string;
      NODE_ENV: string;
      CONFIG_PATH?: string;
    }
  }
}

process.env.PROJECT_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..");
process.env.VENDOR_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..", "vendors");
process.env.RESOURCE_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..");

@Module({})
export class CommonConfigModule {
  public static getYmlConfig(): Record<string | symbol, any> {
    // 判断环境变量中是否有配置文件路径
    if (process.env.CONFIG_PATH) {
      if (!existsSync(process.env.CONFIG_PATH)) {
        new Logger(CommonConfigModule.name).warn(`CONFIG_PATH ${process.env.CONFIG_PATH} not found`);
      } else {
        new Logger(CommonConfigModule.name).log(`Use ${process.env.CONFIG_PATH} file`);
        return load(readFileSync(process.env.CONFIG_PATH, "utf8"));
      }
    }

    // 判断是否有application-*.yml文件
    if (process.env.NODE_ENV && existsSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`))) {
      new Logger(CommonConfigModule.name).log(`Use application-${process.env.NODE_ENV}.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`), "utf8"));
    }

    // 判断是否有application.yml文件
    if (existsSync(join(process.env.RESOURCE_ROOT, "application.yml"))) {
      new Logger(CommonConfigModule.name).log(`Use application.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, "application.yml"), "utf8"));
    }

    // 什么都没有，报错
    throw new Logger(CommonConfigModule.name).error(
      "No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.",
    );
  }

  public basicCheck(configSerivce: ConfigService) {
    configSerivce.getOrThrow("scripts.buildDeps.commands");
    configSerivce.getOrThrow("global");
  }

  public static forRoot() {
    return ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [this.getYmlConfig],
    });
  }
}

import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROJECT_ROOT: string;
      RESOURCE_ROOT: string;
      NODE_ENV: string;
    }
  }
}

process.env.PROJECT_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..");
process.env.RESOURCE_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..");

@Module({})
export class CommonConfigModule {
  public static getYmlConfig(): Record<string | symbol, any> {
    if (process.env.NODE_ENV && existsSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`))) {
      return load(readFileSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`), "utf8"));
    }

    if (existsSync(join(process.env.RESOURCE_ROOT, "application.yml"))) {
      return load(readFileSync(join(process.env.RESOURCE_ROOT, "application.yml"), "utf8"));
    } else {
      throw new Logger().error(
        "No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.",
      );
    }
  }

  public static forRoot() {
    return ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [this.getYmlConfig],
    });
  }
}

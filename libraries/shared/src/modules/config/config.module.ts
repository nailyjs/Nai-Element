import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROJECT_ROOT: string;
      NODE_ENV: string;
    }
  }
}

process.env.PROJECT_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..");

@Module({})
export class CommonConfigModule {
  public static getYmlConfig() {
    return load(readFileSync(join(process.env.PROJECT_ROOT, "application.yml"), "utf8"));
  }

  public static forRoot() {
    return ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [this.getYmlConfig],
    });
  }
}

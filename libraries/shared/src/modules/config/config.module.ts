import { DynamicModule, INestApplication, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";
import { CommonLogger } from "../logger";

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
export class CommonConfigModule extends ConfigModule implements ConfigModule {
  private static _cache: Record<string | symbol, any>;

  /**
   * 获取配置文件
   *
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   * @return {(Record<string | symbol, any>)}
   * @memberof CommonConfigModule
   */
  public static get ymlConfigCache(): Record<string | symbol, any> {
    if (!this._cache) this._cache = this.getYmlConfigDynamic();
    return this._cache;
  }

  /**
   * 获取配置文件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {(Record<string | symbol, any>)}
   * @memberof CommonConfigModule
   */
  public static getYmlConfigDynamic(): Record<string | symbol, any> {
    // 判断环境变量中是否有配置文件路径
    if (process.env.CONFIG_PATH) {
      if (!existsSync(process.env.CONFIG_PATH)) {
        new CommonLogger(CommonConfigModule.name).warn(`CONFIG_PATH ${process.env.CONFIG_PATH} not found`);
      } else {
        new CommonLogger(CommonConfigModule.name).log(`Use ${process.env.CONFIG_PATH} file`);
        return load(readFileSync(process.env.CONFIG_PATH, "utf8"));
      }
    }

    // 判断是否有application-*.yml文件
    if (process.env.NODE_ENV && existsSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`))) {
      new CommonLogger(CommonConfigModule.name).log(`Use application-${process.env.NODE_ENV}.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`), "utf8"));
    }

    // 判断是否有application.yml文件
    if (existsSync(join(process.env.RESOURCE_ROOT, "application.yml"))) {
      new CommonLogger(CommonConfigModule.name).log(`Use application.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, "application.yml"), "utf8"));
    }

    // 什么都没有，报错
    new CommonLogger(CommonConfigModule.name).error(
      "No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.",
    );
    throw new Error("No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.");
  }

  /**
   * 全局注册公共配置模块 用于加载yml配置文件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonConfigModule
   */
  public static forRoot(): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      cache: true,
      load: [this.getYmlConfigDynamic],
    });
  }

  /**
   * 启动前的基础检查
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @template App
   * @param {App} app
   * @memberof CommonConfigModule
   */
  public basicCheck<App extends INestApplication>(app: App) {
    const configService = app.get(ConfigService);
    configService.getOrThrow("scripts.buildDeps.commands");
    configService.getOrThrow("global");
  }
}

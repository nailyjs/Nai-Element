/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { DynamicModule, INestApplication, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { NailyContext } from "../../module.module";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PROJECT_ROOT: string;
      RESOURCE_ROOT: string;
      VENDOR_ROOT: string;
      PUBLIC_ROOT: string;
      CONFIG_PATH?: string;
    }
  }
}

process.env.PROJECT_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..");
process.env.VENDOR_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..", "vendors");
process.env.PUBLIC_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..", "..", "public");
process.env.RESOURCE_ROOT = join(__dirname, "..", "..", "..", "..", "..", "..");

@Module({})
export class CommonConfigModule extends ConfigModule implements ConfigModule {
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
      load: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NailyContext.getYmlConfigDynamic,
      ],
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
  public static basicCheck<App extends INestApplication>(app: App) {
    const configService = app.get(ConfigService);
    configService.getOrThrow("scripts.buildDeps.commands");
    configService.getOrThrow("global");
  }
}

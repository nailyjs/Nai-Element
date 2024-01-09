/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { DynamicModule, Global, Module } from "@nestjs/common";
import { CommonLogger } from "./logger.service";
import { createLogger, format, transports as WinstonTransports } from "winston";
import { consoleFormat } from "./console.format";

export const LOGGER = createLogger({
  level: "debug",
  transports: [
    // 打印
    new WinstonTransports.Console({
      format: consoleFormat,
    }),
    // JSON
    new WinstonTransports.File({
      filename: "log/json/all.log",
      format: format.json(),
    }),
    new WinstonTransports.File({
      filename: "log/json/info.log",
      level: "info",
      format: format.json(),
    }),
    new WinstonTransports.File({
      filename: "log/json/error.log",
      level: "error",
      format: format.json(),
    }),
    new WinstonTransports.File({
      filename: "log/json/verbose.log",
      level: "verbose",
      format: format.json(),
    }),
    new WinstonTransports.File({
      filename: "log/json/warn.log",
      level: "warn",
      format: format.json(),
    }),
    new WinstonTransports.File({
      filename: "log/json/debug.log",
      level: "debug",
      format: format.json(),
    }),
  ],
});

@Global()
@Module({})
export class CommonLoggerModule {
  /**
   * 全局日志模块
   *
   * @returns {DynamicModule}
   * @memberof CommonLoggerModule
   * @static
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public static async forRoot(): Promise<DynamicModule> {
    return {
      module: CommonLoggerModule,
      global: true,
      providers: [CommonLogger],
      exports: [CommonLogger],
    };
  }
}

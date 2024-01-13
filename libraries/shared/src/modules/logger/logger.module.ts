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
import { join } from "path";

function loggerPath(level: string) {
  return join("log", process.env.NODE_ENV ? process.env.NODE_ENV : "", `${level}.log`);
}

export const LOGGER = createLogger({
  level: "debug",
  transports: [
    // 打印
    new WinstonTransports.Console({
      format: format.combine(format.timestamp(), consoleFormat),
    }),
    // JSON
    new WinstonTransports.File({
      filename: loggerPath("all"),
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("info"),
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("error"),
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("verbose"),
      level: "verbose",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("warn"),
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("debug"),
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
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

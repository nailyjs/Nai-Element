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

import "cc.naily.element.shared";
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({})
export class CommonTypeOrmModule {
  /**
   * 注册主数据库模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonTypeOrmModule
   */
  public static forRoot(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const mysql: Record<string, any> = configService.get("global.datasource.mysql") || {};
        return {
          type: "mysql",
          host: mysql.host,
          port: mysql.port,
          username: mysql.username,
          password: mysql.password,
          database: mysql.database,
          entityPrefix: mysql.entityPrefix,
          logging: true,
          autoLoadEntities: true,
          entities: [join(process.env.RESOURCE_ROOT, "**/*/cjs/**/*.entity.js")],
          subscribers: [join(process.env.RESOURCE_ROOT, "**/*/cjs/**/*.subscriber.js")],
          cache: {
            type: "ioredis",
            duration: 1000 * 10,
            options: {
              host: configService.getOrThrow("global.datasource.redis.host"),
              port: configService.getOrThrow("global.datasource.redis.port"),
              password: configService.get("global.datasource.redis.password"),
              db: configService.get("global.datasource.redis.db"),
            },
          },
        };
      },
    });
  }
}

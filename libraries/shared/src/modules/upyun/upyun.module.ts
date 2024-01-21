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

import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Service } from "upyun";
import { UpyunService } from "./upyun.service";

export interface UpyunModuleOptions {
  /**
   * 服务名称
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof UpyunModuleOptions
   */
  serviceName: string;
  /**
   * 操作员名称
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof UpyunModuleOptions
   */
  operatorName?: string;
  /**
   * 操作员密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof UpyunModuleOptions
   */
  password?: string;
}

@Global()
@Module({})
export class CommonUpyunModule {
  public static forRoot(): DynamicModule {
    return {
      module: CommonUpyunModule,
      global: true,
      providers: [
        {
          provide: UpyunService,
          useFactory: (configService: ConfigService) => {
            const options: UpyunModuleOptions = configService.get<UpyunModuleOptions>("global.datasource.upyun");
            const service = new Service(options.serviceName, options.operatorName, options.password);
            return new UpyunService(service, configService);
          },
          inject: [ConfigService],
        },
      ],
      exports: [UpyunService],
    };
  }
}

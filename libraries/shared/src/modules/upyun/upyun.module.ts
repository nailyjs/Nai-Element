import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client, Service } from "upyun";

export const UPYUN_CLIENT = "__UPYUN_CLIENT__";
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

@Module({})
export class CommonUpyunModule {
  public static forRoot(): DynamicModule {
    return {
      module: CommonUpyunModule,
      global: true,
      providers: [
        {
          provide: UPYUN_CLIENT,
          inject: [ConfigService],
          useFactory(configService: ConfigService) {
            const options: UpyunModuleOptions = configService.getOrThrow("global.datasource.upyun");
            return new Client(new Service(options.serviceName, options.operatorName, options.password));
          },
        },
      ],
    };
  }
}

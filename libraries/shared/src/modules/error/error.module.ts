import { DynamicModule, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CommonHttpFilter, CommonUnknownFilter } from "../../errors";
import { CommonAxiosFilter } from "../../errors/axios.filter";

@Module({})
export class CommonErrorModule {
  /**
   * 注册全局错误拦截器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {*}  {DynamicModule}
   * @memberof CommonErrorModule
   */
  public static forRoot(): DynamicModule {
    return {
      module: CommonErrorModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: CommonUnknownFilter,
        },
        {
          provide: APP_FILTER,
          useClass: CommonHttpFilter,
        },
        {
          provide: APP_FILTER,
          useClass: CommonAxiosFilter,
        },
      ],
    };
  }
}

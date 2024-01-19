import { DynamicModule, Global, Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { RedisOptions } from "ioredis";
import { redisStore } from "cache-manager-ioredis-yet";

@Global()
@Module({})
export class CommonCacheModule extends CacheModule implements CacheModule {
  /**
   * 注册缓存模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonCacheModule
   */
  public static forRoot(): DynamicModule {
    return CacheModule.registerAsync<RedisOptions>({
      inject: [ConfigService],
      isGlobal: true,
      async useFactory(configService: ConfigService) {
        const redisConfig = configService.getOrThrow("global.datasource.redis");
        return {
          isGlobal: true,
          ...redisConfig,
          store: await redisStore({
            ...redisConfig,
          }),
        };
      },
    });
  }
}

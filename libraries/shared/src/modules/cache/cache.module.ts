import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { RedisOptions } from "ioredis";
import { redisStore } from "cache-manager-ioredis-yet";

@Module({})
export class CommonCacheModule {
  public static forRoot() {
    return CacheModule.registerAsync<RedisOptions>({
      inject: [ConfigService],
      isGlobal: true,
      async useFactory(cofigService: ConfigService) {
        const redisConfig = cofigService.getOrThrow("global.datasource.redis");
        return {
          isGlobal: true,
          ...redisConfig,
          store: await redisStore(redisConfig),
        };
      },
    });
  }
}

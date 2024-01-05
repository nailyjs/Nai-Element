import { DynamicModule, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CommonHttpFilter, CommonUnknownFilter } from "../../errors";

@Module({})
export class CommonErrorModule {
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
      ],
    };
  }
}

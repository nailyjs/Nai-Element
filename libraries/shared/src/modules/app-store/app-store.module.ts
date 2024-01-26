import { DynamicModule, Module } from "@nestjs/common";
import { AppleAppStoreModule } from "@nailyjs.nest.modules/app-store";
import { CommonAppStoreService } from "./app-store.service";

@Module({})
export class CommonAppStoreModule {
  public static forRoot(): DynamicModule {
    return {
      module: CommonAppStoreModule,
      imports: [AppleAppStoreModule.forCustomService()],
      providers: [CommonAppStoreService],
      global: true,
      exports: [CommonAppStoreService],
    };
  }
}

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 测试接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/03
   * @return {*}  {string}
   * @memberof AppController
   */
  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}

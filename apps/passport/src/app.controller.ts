import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  /**
   * 测试接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/03
   * @return {string}
   * @memberof AppController
   */
  @Get()
  public getHello(): string {
    return "Hello World!";
  }
}

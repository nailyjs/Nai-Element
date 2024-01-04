import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("测试")
@Controller()
export class AppController {
  /**
   * 主页
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

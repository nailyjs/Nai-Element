import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";

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
  @UseInterceptors(ResInterceptor)
  public getHello(): number {
    return 1000;
  }
}

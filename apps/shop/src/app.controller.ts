import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("主页")
@Controller()
export class AppController {
  /**
   * 主页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/18
   * @return {*}  {string}
   * @memberof AppController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  getHello(): number {
    return 1000;
  }
}

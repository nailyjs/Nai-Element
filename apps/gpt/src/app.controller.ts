import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";

@Controller()
@ApiTags("主页")
export class AppController {
  /**
   * 主页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @return {*}  {string}
   * @memberof AppController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  getHello(): number {
    return 1000;
  }
}

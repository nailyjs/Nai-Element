import { Body, Controller, Post } from "@nestjs/common";
import { RegisterByEmailPasswordBodyDTO } from "../dtos/register.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("注册")
@Controller("register")
export class RegisterController {
  /**
   * 通过邮箱密码注册
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @memberof RegisterController
   */
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async registerByEmailPassword(@Body() _body: RegisterByEmailPasswordBodyDTO) {
    return {};
  }
}

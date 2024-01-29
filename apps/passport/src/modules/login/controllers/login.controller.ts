/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { BadRequestException, Body, Controller, Ip, Post, Req, UseInterceptors } from "@nestjs/common";
import { LoginService } from "../providers/login.service";
import { LoginByUsernamePasswordDTO } from "../dtos/login/username/password/login.post.dto";
import { ApiTags } from "@nestjs/swagger";
import { Ips, ResInterceptor } from "cc.naily.element.shared";
import { LoginByUsernamePasswordDataOKResponseDTO, LoginByUsernamePasswordOKResponseDTO } from "../dtos/login/username/password/login.post.res.dto";
import { SwaggerResponse } from "cc.naily.element.swagger";
import { PostLoginEmailCodeBodyDTO } from "../dtos/login/email/code/email.post.dto";
import { PostLoginPhoneCodeBodyDTO } from "../dtos/login/phone/code/login.post.dto";
import { QrCodeService } from "../../../providers/qrcode.service";
import { Auth, User } from "cc.naily.element.auth";
import { PostLoginQrcodeBodyDTO, PostLoginQrcodeConfirmBodyDTO } from "../dtos/login/qrcode/qrcode.post.dto";
import { User as UserEntity, UserRepository } from "cc.naily.element.database";
import { Request } from "express";

@ApiTags("登录")
@Controller("login")
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly qrcodeService: QrCodeService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * 通过用户名密码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @param {LoginByUsernamePasswordDTO} body - 登录信息
   * @returns {Promise<LoginByUsernamePasswordDataOKResponseDTO>} 登录成功信息
   * @memberof LoginController
   */
  @Post("username/password")
  @UseInterceptors(ResInterceptor)
  @SwaggerResponse(LoginByUsernamePasswordOKResponseDTO)
  public async loginByUsernamePassword(
    @Req() req: Request,
    @Body() body: LoginByUsernamePasswordDTO,
    @Ip() ip: string,
  ): Promise<LoginByUsernamePasswordDataOKResponseDTO> {
    console.log(req.headers);
    console.log("ip:", ip);
    return this.loginService.loginByUsernamePassword(body.username, body.password, {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "UsernamePassword",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip,
    });
  }

  /**
   * 通过邮箱验证码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @memberof LoginController
   */
  @Post("email/code")
  @UseInterceptors(ResInterceptor)
  public loginByEmailCode(@Req() req: Request, @Body() body: PostLoginEmailCodeBodyDTO, @Ips() ip: string[]) {
    return this.loginService.loginByEmailCode(body.email, body.code, {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "EmailCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip[0],
    });
  }

  /**
   * 通过手机号验证码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/26
   * @param {PostLoginPhoneCodeBodyDTO} body
   * @memberof LoginController
   */
  @Post("phone/code")
  @UseInterceptors(ResInterceptor)
  public loginByPhoneCode(@Req() req: Request, @Body() body: PostLoginPhoneCodeBodyDTO, @Ips() ip: string[]) {
    console.log(req.headers);
    return this.loginService.loginByPhoneCode(body.phone, body.code, {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "PhoneCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip[0],
    });
  }

  /**
   * 二维码登录：确认登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @param {PostLoginQrcodeBodyDTO} body
   * @param {Request} req
   * @param {string} ip
   * @memberof LoginController
   */
  @Auth()
  @Post("qrcode/confirm")
  @UseInterceptors(ResInterceptor)
  public async confirmQrCode(@Body() body: PostLoginQrcodeConfirmBodyDTO, @User() user: UserEntity) {
    await this.qrcodeService.setQrCode(`${body.key}`, user.userID);
    return 1000;
  }

  /**
   * 二维码登录：检查二维码状态并登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @memberof LoginController
   */
  @Post("qrcode/refresh")
  @UseInterceptors(ResInterceptor)
  public async refreshQrCode(@Body() body: PostLoginQrcodeBodyDTO, @Ips() ip: string[]) {
    const checkStatus = await this.qrcodeService.getQrCode(`${body.key}`);
    if (!checkStatus) throw new BadRequestException(1041);
    if (checkStatus === "pending") throw new BadRequestException(1042);
    return this.loginService.loginByQrCode(await this.userRepository.findOneBy({ userID: checkStatus }), {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "QrCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip[0],
    });
  }
}

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

import { BadRequestException, Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";
import { TransportGoogleService } from "./google.service";
import { PostGoogleReCaptchaTokenBodyDTO } from "./google.dto";
import { ReCaptchaTokenCheckerResDTO } from "./google.res.dto";

@ApiTags("Google recaptcha")
@Controller("tansport/google")
export class GoogleController {
  constructor(
    private readonly configService: ConfigService,
    private readonly transportGoogleService: TransportGoogleService,
  ) {}

  /**
   * 获取 Google Recaptcha 客户端密钥
   *
   * @author ipadhim <ipadhim@qq.com>
   * @date 2024/01/24
   * @memberof GoogleController
   */
  @Get("recaptcha")
  @UseInterceptors(ResInterceptor)
  public async getRecaptchaClientKey() {
    return {
      client: this.configService.get("global.google.recaptcha.client"),
    };
  }

  /**
   * 测试人机验证是否通过
   *
   * @author ipadhim <ipadhim@qq.com>
   * @date 2024/01/24
   * @param {string} { token }
   */
  @Post("recaptcha")
  @UseInterceptors(ResInterceptor)
  @ApiCreatedResponse({ type: ReCaptchaTokenCheckerResDTO, description: "请求成功" })
  public async recaptchaChecker(@Body() { token }: PostGoogleReCaptchaTokenBodyDTO) {
    const check = await this.transportGoogleService.checkRecaptcha(token);
    if (check.success)
      if (check.score >= 0.5) return "Human";
      else throw new BadRequestException("Robot");
    else throw new BadRequestException(check["error-codes"][0]);
  }
}

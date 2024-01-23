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

import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

/**
 * @author ipadhim <ipadhim@qq.com>
 */
export class ReCaptchaTokenCheckerResDTO {
  /**
   * Human - 是人类
   *
   * Robot - 可能是机器人
   *
   * timeout-or-duplicate - Token超时或使用过
   *
   * @type {string}
   */
  @IsIn(["Human", "Robot", "timeout-or-duplicate"])
  @ApiProperty({ enum: ["Human", "Robot", "timeout-or-duplicate"] })
  readonly message: "Human" | "Robot" | "timeout-or-duplicate";
}

export class ReCaptchaTokenGetterResDTO {
  /**
   * 密钥
   *
   * @default 6LfNho0nAAAAAKlP1rqLg292VLAGKfAEVGqqBIYW
   * @example 6LfNho0nAAAAAKlP1rqLg292VLAGKfAEVGqqBIYW
   * @author Zero <gczgroup@qq.com>
   * @date 09/08/2023
   * @type {string}
   * @memberof ReCaptchaTokenGetterResDTO
   */
  readonly message: string;
}

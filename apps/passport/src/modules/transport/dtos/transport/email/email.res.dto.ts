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

import { DTO, DTODescription, DTOStatus } from "cc.naily.element.swagger";

@DTO()
@DTOStatus(429)
@DTODescription(429, `请求过于频繁 目前后端限制的是每60秒最多5次 后端虽然兜了底但是仍请前端自行做好限制`)
export class SendEmailVerifyCode429ResDTO {
  statusCode = 429;
  code = 1014;
  message = "请求过于频繁，请稍后再试";
}

@DTO()
@DTOStatus(201)
@DTODescription(201, "发送成功")
export class SendEmailVerifyCode201ResDTO {
  statusCode = 201;
  code = 1012;
  message = "发送成功";
}

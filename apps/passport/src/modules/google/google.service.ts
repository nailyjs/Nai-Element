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

import axios from "axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TransportGoogleService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * 测试人机验证是否通过
   *
   * @author ipadhim <ipadhim@qq.com>
   * @memberof TransportService
   */
  async checkRecaptcha(token: string): Promise<{
    success: boolean;
    "error-codes": string[];
    action: string;
    score: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
  }> {
    const resp = await axios.post(
      "https://www.recaptcha.net/recaptcha/api/siteverify",
      {
        secret: this.configService.get("global.google.recaptcha.server"),
        response: token,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return resp.data;
  }
}

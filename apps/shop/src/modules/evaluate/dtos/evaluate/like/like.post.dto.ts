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

import { IsNotEmpty, IsUUID } from "class-validator";

export class PostCreateEvaluateLikeBodyDTO {
  /**
   * 商品评论ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {number}
   * @memberof PostCreateEvaluateLikeBodyDTO
   */
  @IsUUID()
  @IsNotEmpty()
  evaluateID: string;
}

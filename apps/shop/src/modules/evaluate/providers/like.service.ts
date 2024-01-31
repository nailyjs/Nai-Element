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

import { ForbiddenException, Injectable } from "@nestjs/common";
import { ShopEvaluateLikeRepository, UserControlRepository } from "cc.naily.element.database";

@Injectable()
export class EvaluateLikeService {
  constructor(
    private readonly shopEvaluateLikeRepository: ShopEvaluateLikeRepository,
    private readonly userControlRepository: UserControlRepository,
  ) {}

  public async list(orderTime: "latest" | "oldest", loggingUserID: string, userID: string, take: number, skip: number) {
    if (loggingUserID != userID) {
      const userControl = await this.userControlRepository.findOne({
        where: { user: { userID } },
        cache: true,
      });
      if (!userControl.publicEvaluateLike) throw new ForbiddenException(1037);
    }
    const list = await this.shopEvaluateLikeRepository.find({
      take: take || 10,
      skip: skip || 0,
      where: userID ? { user: { userID } } : {},
      cache: true,
      order: {
        updatedAt: orderTime === "oldest" ? "ASC" : "DESC",
      },
      relations: {
        shopEvaluate: {
          product: {
            user: true,
          },
        },
      },
    });
    return list.map((item) => {
      item.user = undefined;
      return item;
    });
  }
}

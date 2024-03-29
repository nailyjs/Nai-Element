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

import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { ShopEvaluateLikeRepository, ShopEvaluateRepository, User as UserEntity, UserRepository } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { PostCreateEvaluateLikeBodyDTO } from "../dtos/evaluate/like/like.post.dto";
import { EvaluateLikeService } from "../providers/like.service";
import { GetEvaluateLikeQueryDTO } from "../dtos/evaluate/like/like.get.dto";

@ApiTags("产品评论")
@Controller("evaluate/like")
export class EvaluateLikeController {
  constructor(
    private readonly shopEvaluateLikeRepository: ShopEvaluateLikeRepository,
    private readonly shopEvaluateRepository: ShopEvaluateRepository,
    private readonly userRepository: UserRepository,
    private readonly evaluateLikeService: EvaluateLikeService,
  ) {}

  /**
   * 获取用户评论点赞列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {Omit<UserEntity, "password">} user
   * @param {GetEvaluateLikeQueryDTO} query
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateLikeController
   */
  @Get()
  @Auth(true)
  @UseInterceptors(ResInterceptor)
  @ApiForbiddenResponse({ description: "如果访客访问但是用户没有开权限 则返回403" })
  @ApiOkResponse({ description: "如果用户本人已登录 正常返回点赞列表" })
  public async getUserLike(@User() user: Omit<UserEntity, "password">, @Query() query: GetEvaluateLikeQueryDTO): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if (!query.orderTime) query.orderTime = "latest";
    const queryUser = await this.userRepository.findOne({
      cache: true,
      where: { userID: query.userID },
    });
    if (user.userID != query.userID && !queryUser) {
      throw new BadRequestException(1015);
    }
    return this.evaluateLikeService.list(query.orderTime, user.userID, query.userID, query.take, query.skip);
  }

  /**
   * 评论点赞
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {Omit<UserEntity, "password">} user
   * @param {PostCreateEvaluateLikeBodyDTO} body
   * @return {*}
   * @memberof EvaluateLikeController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async createLike(@User() user: Omit<UserEntity, "password">, @Body() body: PostCreateEvaluateLikeBodyDTO): Promise<unknown> {
    const eva = await this.shopEvaluateRepository.findOneBy({ evaluateID: body.evaluateID });
    if (!eva) throw new BadRequestException(1036);
    return await this.shopEvaluateLikeRepository.createLike(await this.userRepository.findOneBy({ userID: user.userID }), eva);
  }

  /**
   * 评论取消点赞
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {Omit<UserEntity, "password">} user
   * @param {PostCreateEvaluateLikeBodyDTO} body
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateLikeController
   */
  @Delete()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async deleteLike(@User() user: Omit<UserEntity, "password">, @Body() body: PostCreateEvaluateLikeBodyDTO): Promise<unknown> {
    const eva = await this.shopEvaluateRepository.findOneBy({ evaluateID: body.evaluateID });
    if (!eva) throw new BadRequestException(1036);
    return await this.shopEvaluateLikeRepository.deleteLike(await this.userRepository.findOneBy({ userID: user.userID }), eva);
  }
}

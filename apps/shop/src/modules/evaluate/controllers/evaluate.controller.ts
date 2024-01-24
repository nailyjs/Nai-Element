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
import { ApiTags } from "@nestjs/swagger";
import {
  GetEvaluateChildrenQueryDTO,
  GetEvaluateQueryDTO,
  PostCreateEvaluateBodyDTO,
  PostReplyEvaluateBodyDTO,
} from "../dtos/evaluate/evaluate.get.dto";
import { ShopEvaluateRepository, User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { Auth, User } from "cc.naily.element.auth";
import { EvaluateService } from "../providers/evaluate.service";

@ApiTags("产品评论")
@Controller("evaluate")
export class EvaluateController {
  constructor(
    private readonly shopEvaluateRepository: ShopEvaluateRepository,
    private readonly evaluateService: EvaluateService,
  ) {}

  /**
   * 根据商品列出评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {GetEvaluateQueryDTO} query
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async listEvaluate(@Query() query: GetEvaluateQueryDTO): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if (!query.orderLike) query.orderLike = "most";
    if (!query.orderTime) query.orderTime = "latest";
    const evas = await this.shopEvaluateRepository.find({
      where: { product: { productID: query.productID } },
      order: {
        updatedAt: query.orderTime === "oldest" ? "ASC" : "DESC",
        likeCount: query.orderLike === "least" ? "ASC" : "DESC",
      },
      relations: ["user"],
      take: query.take,
      skip: query.skip,
    });
    return evas.map((eva) => {
      eva.product = undefined;
      return eva;
    });
  }

  /**
   * 根据商品父评论列出子评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {GetEvaluateChildrenQueryDTO} query
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateController
   */
  @Get("children")
  @UseInterceptors(ResInterceptor)
  public async listEvaluateChildren(@Query() query: GetEvaluateChildrenQueryDTO): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if (!query.depth) query.depth = 3;
    const parent = await this.shopEvaluateRepository.findOneBy({ evaluateID: query.evaluateID });
    return this.shopEvaluateRepository.findDescendantsTree(parent, {
      depth: query.depth,
      relations: ["user"],
    });
  }

  /**
   * 创建商品评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {PostCreateEvaluateBodyDTO} { content, productID }
   * @param {Omit<UserEntity, "password">} user
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public createEvaluate(@Body() { content, productID }: PostCreateEvaluateBodyDTO, @User() user: Omit<UserEntity, "password">): Promise<unknown> {
    return this.evaluateService.createEvaluate(content, user.userID, productID);
  }

  /**
   * 回复商品评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {PostReplyEvaluateBodyDTO} { content, evaluateID }
   * @param {Omit<UserEntity, "password">} user
   * @return {*}  {Promise<unknown>}
   * @memberof EvaluateController
   */
  @Auth()
  @Post("reply")
  @UseInterceptors(ResInterceptor)
  public replyEvaluate(@Body() { content, evaluateID }: PostReplyEvaluateBodyDTO, @User() user: Omit<UserEntity, "password">): Promise<unknown> {
    return this.evaluateService.replyEvaluate(content, user.userID, evaluateID);
  }

  /**
   * 删除商品评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @memberof EvaluateController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async deleteEvaluate(@Body() { evaluateID }, @User() user: Omit<UserEntity, "password">) {
    const hasEvaluate = this.shopEvaluateRepository.findOneBy({ evaluateID, user });
    if (!hasEvaluate) throw new BadRequestException(1036);
    await this.shopEvaluateRepository.delete({ evaluateID });
    return true;
  }
}

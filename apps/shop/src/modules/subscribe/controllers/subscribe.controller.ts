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

import { Body, Controller, Get, Patch, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SubscribeService } from "../providers/subscribe.service";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { ResInterceptor } from "cc.naily.element.shared";
import { getSubscribeUserStatusQueryDTO, PostSubscribeBodyDTO, PutSubscribeBodyDTO } from "../dtos/subscribe/subscribe.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

@ApiTags("订阅")
@Controller("subscribe")
@UseInterceptors(CacheInterceptor)
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  /**
   * 获取订阅制商品列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @return {*}  {Promise<unknown>}
   * @memberof SubscribeController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  getSubscribeList(): Promise<unknown> {
    return this.subscribeService.getSubscribeList();
  }

  /**
   * 根据`subscribeID`获取单个订阅制商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @param {getSubscribeUserStatusQueryDTO} query
   * @return {Promise<ShopSubscribe>}
   * @memberof SubscribeController
   */
  @Get("single")
  @UseInterceptors(ResInterceptor)
  getSubscribeSingle(@Query() query: getSubscribeUserStatusQueryDTO): Promise<unknown> {
    return this.subscribeService.getSubscribeSingle(query.subscribeID);
  }

  /**
   * 创建一个订阅制的商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @param { title, introduction, duration, price }
   * @param {Omit<UserEntity, "password">} user 当前登录用户
   * @return {Promise<ShopSubscribe>}
   * @memberof SubscribeController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  createSubscribe(
    @Body() { title, introduction, duration, price }: PostSubscribeBodyDTO,
    @User() user: Omit<UserEntity, "password">,
  ): Promise<unknown> {
    return this.subscribeService.createSubscribe(title, introduction, duration, price, user.userID);
  }

  /**
   * 订阅一个订阅制的商品
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @memberof SubscribeController
   */
  @Put()
  @Auth()
  @UseInterceptors(ResInterceptor)
  subscribe(@Body() { subscribeID }: PutSubscribeBodyDTO, @User() user: Omit<UserEntity, "password">): Promise<unknown> {
    return this.subscribeService.subscribe(subscribeID, user.userID);
  }

  /**
   * 续费一个订阅制的商品
   *
   * @param {getSubscribeUserStatusQueryDTO} subscribeID 订阅制商品ID
   * @param {Omit<UserEntity, "password">} user 当前登录用户
   * @author Zero <gczgroup@qq.com>
   * @memberof SubscribeController
   * @date 2024/01/21
   */
  @Auth()
  @Patch()
  @UseInterceptors(ResInterceptor)
  renewSubscribe(@Body() { subscribeID }: PutSubscribeBodyDTO, @User() user: Omit<UserEntity, "password">): Promise<unknown> {
    return this.subscribeService.renewSubscribe(subscribeID, user.userID);
  }

  /**
   * 获取当前用户某个订阅制商品的订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @param {getSubscribeUserStatusQueryDTO} query
   * @param {Omit<UserEntity, "password">} user
   * @return {*}  {Promise<unknown>}
   * @memberof SubscribeController
   */
  @Auth()
  @Get("user/status")
  @UseInterceptors(ResInterceptor)
  getSubscribeStatus(@Query() query: getSubscribeUserStatusQueryDTO, @User() user: Omit<UserEntity, "password">): Promise<unknown> {
    return this.subscribeService.getSubscribeStatus(query.subscribeID, user.userID);
  }
}

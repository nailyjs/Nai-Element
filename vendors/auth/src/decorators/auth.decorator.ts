import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CommonAuthGuard } from "../guards/common.guard";
import { Request } from "express";

/**
 * 授权装饰器
 *
 * @function
 * @description 凡是需要使用`@User`装饰器的地方都得使用本装饰器。
 * @param {boolean} isOptional - 是否允许未登录的用户访问。默认为 false，即必须登录才能访问
 * @returns {ClassDecorator & MethodDecorator}
 * @author Zero <gczgroup@qq.com>
 * @since 2024
 */
export function Auth(): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(CommonAuthGuard));
}

/**
 * 获取已登录用户信息
 *
 * @function
 * @description 用于获取已登录用户信息 必须在控制器方法的参数中使用
 * @returns {ParameterDecorator}
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});

import { applyDecorators, createParamDecorator, UseGuards } from "@nestjs/common";
import { CommonMustAuthGuard, CommonOptionalAuthGuard } from "../modules/jwt";
import { ApiBearerAuth } from "@nestjs/swagger";

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
export function Auth(isOptional: boolean = false): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(isOptional ? CommonOptionalAuthGuard : CommonMustAuthGuard));
}

/**
 * 获取已登录用户信息
 *
 * @function
 * @description 用于获取已登录用户信息 必须在控制器方法的参数中使用
 * @returns {ParameterDecorator}
 */
export function User(): ParameterDecorator {
  return createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  });
}

import { Type } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SwaggerWatermark } from "../constants";
import { MethodDescription, MethodStatus } from "../typings";

/**
 * Swagger响应DTO
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/01/06
 * @export
 * @param {Type} dto - DTO类 (必须使用`@DTO()`装饰器装饰)
 * @return {MethodDecorator}
 */
export function SwaggerResponse(dto: Type): MethodDecorator;
export function SwaggerResponse(dto: Type) {
  const isDTO = Reflect.getMetadata(SwaggerWatermark.DTO, dto);
  if (!isDTO) throw new TypeError(`'${dto.name}' is not a DTO class, please decorate it with '@DTO()'`);
  const dtoStatus: number = Reflect.getMetadata(SwaggerWatermark.Status, dto);
  const dtoDescription: MethodDescription[] = Reflect.getMetadata(SwaggerWatermark.Description, dto) || [];

  return (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    const methodStatus: MethodStatus[] = Reflect.getMetadata(SwaggerWatermark.Status, target, key);
    if (methodStatus) {
      for (const { status, type } of methodStatus) {
        ApiResponse({
          type: type,
          status: status,
          description: (() => {
            const description = dtoDescription.find((item) => item.status === status);
            return description ? description.description : undefined;
          })(),
        })(target, key, descriptor);
      }
    } else {
      ApiResponse({
        type: dto,
        status: dtoStatus,
        description: (() => {
          const description = dtoDescription.find((item) => item.status === dtoStatus);
          return description ? description.description : undefined;
        })(),
      })(target, key, descriptor);
    }
  };
}

import { Type } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { SwaggerWatermark } from "../constants";

export interface MethodStatus {
  status: number;
  type: Type;
}

export function SwaggerResponse(dto: Type): MethodDecorator;
export function SwaggerResponse(dto: Type) {
  const isDTO = Reflect.getMetadata(SwaggerWatermark.DTO, dto);
  if (!isDTO) throw new TypeError(`'${dto.name}' is not a DTO class, please decorate it with '@DTO()'`);
  const dtoStatus: number = Reflect.getMetadata(SwaggerWatermark.Status, dto);
  const methodStatus: MethodStatus[] = Reflect.getMetadata(SwaggerWatermark.Status, dto);

  return (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    ApiResponse({ type: dto, status: dtoStatus })(target, key, descriptor);

    methodStatus.forEach(({ status, type }) => {
      ApiResponse({ type, status: status })(target, key, descriptor);
    });
  };
}

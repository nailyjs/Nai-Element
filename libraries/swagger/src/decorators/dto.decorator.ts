import { Type } from "@nestjs/common";
import { SwaggerWatermark } from "../constants";

export function DTO(): ClassDecorator;
export function DTO() {
  return (target: Type) => {
    Reflect.defineMetadata(SwaggerWatermark.DTO, true, target);
  };
}

export function DTOStatus(code: number): ClassDecorator;
export function DTOStatus(code: number, dto: Type): MethodDecorator;
export function DTOStatus(code: number, dto?: Type) {
  return (target: Type | Object, key?: string | symbol) => {
    if (typeof target === "function") {
      Reflect.defineMetadata(SwaggerWatermark.Status, code, target);
      return;
    }

    if (!dto) throw new TypeError(`'${target.constructor.name}' is not a DTO class, please decorate it with '@DTO()'`);
    const isDTO = Reflect.getMetadata(SwaggerWatermark.DTO, dto);
    if (!isDTO) throw new TypeError(`'${dto.name}' is not a DTO class, please decorate it with '@DTO()'`);
    Reflect.defineMetadata(
      SwaggerWatermark.Status,
      [
        {
          status: code,
          type: dto,
        },
      ],
      target,
      key,
    );
  };
}

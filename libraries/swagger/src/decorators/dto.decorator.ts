import { Type } from "@nestjs/common";
import { SwaggerWatermark } from "../constants";
import { MethodDescription, MethodStatus } from "../typings";

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
      const oldMetadata: MethodStatus[] = Reflect.getMetadata(SwaggerWatermark.Status, target) || [];
      Reflect.defineMetadata(
        SwaggerWatermark.Status,
        [
          ...oldMetadata,
          {
            status: code,
            type: target,
          },
        ],
        target,
      );
      return;
    }

    if (!dto) throw new TypeError(`'${target.constructor.name}' is not a DTO class, please decorate it with '@DTO()'`);
    const isDTO = Reflect.getMetadata(SwaggerWatermark.DTO, dto);
    if (!isDTO) throw new TypeError(`'${dto.name}' is not a DTO class, please decorate it with '@DTO()'`);
    const oldMetadata: MethodStatus[] = Reflect.getMetadata(SwaggerWatermark.Status, target, key) || [];
    Reflect.defineMetadata(
      SwaggerWatermark.Status,
      [
        ...oldMetadata,
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

export function DTODescription(code: number, description: string): ClassDecorator;
export function DTODescription(code: number, description: string) {
  return (target: Type) => {
    const oldMetadata: MethodDescription[] = Reflect.getMetadata(SwaggerWatermark.Description, target) || [];
    Reflect.defineMetadata(
      SwaggerWatermark.Description,
      [
        ...oldMetadata,
        {
          status: code,
          description,
        },
      ],
      target,
    );
  };
}

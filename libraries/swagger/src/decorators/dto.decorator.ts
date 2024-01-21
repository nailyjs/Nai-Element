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

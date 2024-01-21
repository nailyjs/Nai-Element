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

import { registerDecorator } from "class-validator";

export function IsIntStringOrIntStringArray(): PropertyDecorator;
export function IsIntStringOrIntStringArray() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntStringOrIntStringArray",
      target: target.constructor,
      propertyName: key,
      options: {
        message: `${key} is not a Int or Int array!`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "number") return true;
          if (typeof value === "string" && Number.isInteger(parseInt(value))) return true;
          if (Array.isArray(value) && value.every((item) => typeof item === "number")) return true;
          if (Array.isArray(value) && value.every((item) => typeof item === "string" && Number.isInteger(parseInt(item)))) return true;
          return false;
        },
      },
    });
  };
}

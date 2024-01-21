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

export function IntStringMin(min: number): PropertyDecorator;
export function IntStringMin(min: number) {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntString",
      target: target.constructor,
      propertyName: key,
      constraints: [min],
      options: {
        message: `${key} is not a int string`,
      },
      validator: {
        validate(value: unknown) {
          const isIntString = typeof value === "string" && Number.isInteger(parseInt(value));
          if (!isIntString) return false;
          return parseInt(value) >= min;
        },
      },
    });
  };
}

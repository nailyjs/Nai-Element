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

export function IsIntString(): PropertyDecorator;
export function IsIntString() {
  return (target: Object, key: string) => {
    return registerDecorator({
      name: "isIntString",
      target: target.constructor,
      propertyName: key,
      constraints: ["isIntString"],
      options: {
        message: `${key} is not a int or int string`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "string") {
            return Number.isInteger(Number(value));
          } else if (typeof value === "number") {
            return Number.isInteger(value);
          } else {
            return false;
          }
        },
      },
    });
  };
}

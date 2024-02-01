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

import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class AbstractBlockService<T> {
  private readonly isUpdating: T[] = [];

  public getState(single: T): boolean {
    const isUpdated = this.isUpdating.find((item) => item === single);
    if (isUpdated) return false;
    return true;
  }

  public setState(single: T): void {
    this.isUpdating.push(single);
  }

  public removeState(single: T): void {
    const index = this.isUpdating.findIndex((item) => item === single);
    this.isUpdating.splice(index, 1);
  }
}

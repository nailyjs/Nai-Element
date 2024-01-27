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
import { User, UserDataRepository } from "cc.naily.element.database";

@Injectable()
export class UserDataService {
  constructor(private readonly userDataRepository: UserDataRepository) {}

  getUserData(user: User, namespace: string, key: string) {
    return this.userDataRepository.findOneBy({ user, namespace, key });
  }

  setUserData(user: User, namespace: string, key: string, value: string) {
    return this.userDataRepository.save({ user, namespace, key, value });
  }

  deleteUserData(user: User, namespace: string, key: string) {
    return this.userDataRepository.delete({ user, namespace, key });
  }
}

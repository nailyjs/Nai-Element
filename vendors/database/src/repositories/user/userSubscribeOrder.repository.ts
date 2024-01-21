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

import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { UserSubscribeOrder } from "../../entities";

@Repository
export class UserSubscribeOrderRepository extends EntityRepository<UserSubscribeOrder> {
  constructor(dataSource: DataSource) {
    super(UserSubscribeOrder, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}

import { Injectable, Type } from "@nestjs/common";

export function Repository(target: Type) {
  Injectable()(target);
}

export { Repository as EntityRepository } from "typeorm";

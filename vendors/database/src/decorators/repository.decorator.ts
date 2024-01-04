import { Injectable, Type } from "@nestjs/common";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Repository(target: Type) {
  Injectable()(target);
}

export { Repository as EntityRepository } from "typeorm";

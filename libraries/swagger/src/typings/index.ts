import { Type } from "@nestjs/common";

export interface MethodStatus {
  status: number;
  type: Type;
}

export interface MethodDescription {
  status: number;
  description: string;
}

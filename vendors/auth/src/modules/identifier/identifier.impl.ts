import { ILoginMethod } from "cc.naily.element.database";
import { LoginType } from "../jwt";

export interface ILoginPayload {
  loginType: LoginType;
  loginMethod: ILoginMethod;
  loginIP: string;
  loginClient?: string;
  loginDeviceName: string;
  identifier?: string;
}

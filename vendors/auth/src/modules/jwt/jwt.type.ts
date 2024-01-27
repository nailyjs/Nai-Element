import { ILoginMethod } from "cc.naily.element.database";

export type LoginType = "WatchOS" | "HarmonyOS_Wearable" | "Android" | "Web" | "IOS";
export const LoginTypeArray: LoginType[] = ["WatchOS", "HarmonyOS_Wearable", "Android", "Web", "IOS"];
export interface LoginIdentifier {
  loginType: LoginType;
  identifier?: string;
  loginClient?: string;
  loginMethod?: ILoginMethod;
}
export interface JwtLoginPayload extends LoginIdentifier {
  userID: number;
}

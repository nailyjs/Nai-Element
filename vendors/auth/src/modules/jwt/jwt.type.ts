export type LoginType = "WatchOS" | "HarmonyOS_Wearable" | "Android" | "Web";
export const LoginTypeArray: LoginType[] = ["WatchOS", "HarmonyOS_Wearable", "Android", "Web"];
export interface LoginIdentifier {
  loginType: LoginType;
  identifier?: string;
  loginClient?: string;
}
export interface JwtLoginPayload extends LoginIdentifier {
  userID: number;
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User, UserIdentifier, UserIdentifierRepository } from "cc.naily.element.database";
import { LoginType } from "../jwt";

@Injectable()
export class IdentifierService {
  private readonly maxWatchOSIdentifierCount: number;
  private readonly maxAndroidIdentifierCount: number;
  private readonly maxWebIdentifierCount: number;
  private readonly maxHarmonyOS_WearableIdentifierCount: number;

  constructor(
    private readonly userIdentifierRepository: UserIdentifierRepository,
    configService: ConfigService,
  ) {
    this.maxWatchOSIdentifierCount = configService.getOrThrow<number>("passport.maxIdentifierCount.watchOS");
    this.maxAndroidIdentifierCount = configService.getOrThrow<number>("passport.maxIdentifierCount.android");
    this.maxWebIdentifierCount = configService.getOrThrow<number>("passport.maxIdentifierCount.web");
    this.maxHarmonyOS_WearableIdentifierCount = configService.getOrThrow<number>("passport.maxIdentifierCount.harmonyOS_wearable");
  }

  /**
   * 获取某设备类型的登录标识符的最大数量
   *
   * @example 0 - 无限制
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {LoginType} loginType
   * @memberof IdentifierService
   * @returns {number}
   */
  public getMaxIdentifierCount(loginType: LoginType): number {
    switch (loginType) {
      case "Web":
        return this.maxWebIdentifierCount;
      case "Android":
        return this.maxAndroidIdentifierCount;
      case "WatchOS":
        return this.maxWatchOSIdentifierCount;
      case "HarmonyOS_Wearable":
        return this.maxHarmonyOS_WearableIdentifierCount;
      default:
        return 0;
    }
  }

  /**
   * 检查登录标识符是否存在
   *
   * @description 如果登录设备类型为Web，则登录标识符可以为空
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {User} user
   * @param {LoginType} loginType 登录设备类型
   * @param {string} identifier 登录标识符
   * @return {Promise<"OK" | "ERROR">} 存在返回OK 不存在返回ERROR
   * @memberof IdentifierService
   */
  public async checkIdentifier(user: User, loginType: LoginType, loginClient?: string, identifier?: string): Promise<"OK" | "ERROR"> {
    if (loginType === "Web" && !identifier) return "OK";
    const findIdentifier = await this.userIdentifierRepository.findOneBy({
      user: { userID: user.userID },
      loginType,
      loginClient,
      identifier,
    });
    if (!findIdentifier) return "ERROR";
    return "OK";
  }

  /**
   * 登录时 更新登录标识符
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @param {User} user
   * @param {LoginType} loginType
   * @param {string} [identifier]
   * @memberof IdentifierService
   */
  public async renewIdentifier(user: User, loginType: LoginType, loginClient?: string, identifier?: string) {
    // Web端登录时，identifier和loginClient可以为空
    // 其他端登录时，identifier不能为空
    if (loginType !== "Web" && (!identifier || !loginClient)) return "ERROR";
    // 找到所有登录标识符
    const identifiers = await this.userIdentifierRepository.find({
      where: { user: { userID: user.userID }, loginClient, loginType },
      cache: false,
    });
    // 找到当前登录标识符
    const singleIdentifier = identifiers.find(
      (item) => item.identifier === identifier && item.loginType === loginType && item.loginClient === loginClient,
    );
    // 如果当前登录标识符不存在，则创建新的登录标识符
    if (!singleIdentifier) {
      // 标识符最大数量 从配置文件中获取
      const maxCount = this.getMaxIdentifierCount(loginType);
      // 如果登录标识符数量超过最大数量，则删除最早的登录标识符
      // 删除最早的登录标识符 保留最新的maxCount - 1个登录标识符
      const willRemoveIdentifiers: UserIdentifier[] = identifiers.slice(0, identifiers.length - maxCount + 1);
      await this.userIdentifierRepository.remove(willRemoveIdentifiers);
      const newIdentifier = new UserIdentifier();
      newIdentifier.identifier = identifier;
      newIdentifier.loginType = loginType;
      newIdentifier.loginClient = loginClient;
      newIdentifier.user = user;
      await this.userIdentifierRepository.save(newIdentifier);
    }
    return "OK";
  }
}

import { DataSource } from "typeorm";
import { EntityRepository, Repository } from "../../decorators";
import { User, UserOrder, UserValue } from "../../entities";

@Repository
export class UserOrderRepository extends EntityRepository<UserOrder> {
  constructor(private readonly dataSource: DataSource) {
    super(UserOrder, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }

  /**
   * 创建订单
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {User} user 用户实体
   * @param {string} tradeOrderID 交易订单号
   * @param {string} amount 金额
   * @param {("xunhupayWechat" | "xunhupayAlipay" | "wechat" | "alipay")} method 支付方式
   * @param {("pending" | "success")} status 状态
   * @param {string} [remark]
   * @return {Promise<UserOrder>}
   * @memberof UserOrderRepository
   */
  public async createOrder(
    user: User | Omit<User, "password">,
    tradeOrderID: string,
    amount: number,
    method: "xunhupayWechat" | "xunhupayAlipay" | "wechat" | "alipay",
    status: "pending" | "success",
    remark?: string,
  ): Promise<UserOrder> {
    const userOrder = new UserOrder();
    userOrder.user = await this.dataSource.getRepository(User).findOneBy({ userID: user.userID });
    userOrder.tradeOrderID = tradeOrderID;
    userOrder.amount = amount;
    userOrder.method = method;
    userOrder.status = status;
    userOrder.remark = remark;
    return this.save(userOrder);
  }

  /**
   * 更新订单状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {string} tradeOrderID 交易订单号
   * @return {UserOrder}
   * @memberof UserOrderRepository
   */
  public async updateStatus(tradeOrderID: string): Promise<UserOrder | undefined> {
    const userOrder = await this.findOne({
      where: { tradeOrderID },
      relations: { user: true },
    });
    if (!userOrder) return;
    userOrder.status = "success";
    await this.save(userOrder);
    const userValue = await this.dataSource.getRepository(UserValue).findOneBy({ user: userOrder.user });
    userValue.balance = userValue.balance + userOrder.amount;
    return userOrder;
  }
}

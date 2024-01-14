export interface PayServiceImpl {
  /**
   * 支付服务接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @template T
   * @param {...any[]} args 传入参数
   * @return {Promise<PayServiceResponse<T>>}
   * @memberof PayServiceImpl
   */
  pay<T>(...args: any[]): Promise<PayServiceResponse<T>>;
  /**
   * 支付通知接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @param {...any[]} args
   * @return {*}  {Promise<any>}
   * @memberof PayServiceImpl
   */
  notify?(...args: any[]): Promise<any>;
}

export interface PayServiceResponse<T = any> {
  trade_order_id: string;
  response_data: T;
}

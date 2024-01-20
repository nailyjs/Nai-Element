import { IsIntString } from "cc.naily.element.validator";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class PostSubscribeBodyDTO {
  /**
   * 商品标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  title: string;
  /**
   * 商品介绍
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  introduction: string;
  /**
   * 商品时长（天）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostSubscribeBodyDTO
   */
  duration: number;
  /**
   * 商品价格（元）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PostSubscribeBodyDTO
   */
  price: number;
}

export class PutSubscribeBodyDTO {
  /**
   * 订阅制商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/20
   * @type {number}
   * @memberof PutSubscribeBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  subscribeID: number;
}

export class getSubscribeUserStatusQueryDTO {
  /**
   * 订阅制商品ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/21
   * @type {number}
   * @memberof getSubscribeUserStatusQueryDTO
   */
  @IsIntString()
  @IsNotEmpty()
  subscribeID: number;
}

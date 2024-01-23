import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ShopEvaluateRepository, ShopProductRepository, UserRepository } from "cc.naily.element.database";

@Injectable()
export class EvaluateService {
  constructor(
    private readonly shopEvaluateRepository: ShopEvaluateRepository,
    private readonly userRepository: UserRepository,
    private readonly shopProductRepository: ShopProductRepository,
  ) {}

  public async createEvaluate(content: string, userID: number, productID: number) {
    const user = await this.userRepository.findOneBy({ userID });
    if (!user) throw new NotFoundException(1015);
    const product = await this.shopProductRepository.findOneBy({ productID });
    if (!product) throw new BadRequestException("商品不存在");
    return this.shopEvaluateRepository.createEvaluate(content, user, product);
  }

  public async replyEvaluate(content: string, userID: number, evaluateID: number) {
    const user = await this.userRepository.findOneBy({ userID });
    if (!user) throw new NotFoundException(1015);
    const parent = await this.shopEvaluateRepository.findOneBy({ evaluateID });
    if (!parent) throw new BadRequestException(1035);
    return this.shopEvaluateRepository.createSubEvaluate(content, user, parent);
  }
}

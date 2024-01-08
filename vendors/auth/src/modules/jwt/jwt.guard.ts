import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: Request.user;
    }

    export namespace Request {
      export interface user {
        userID: number;
      }
    }
  }
}

@Injectable()
export abstract class CommonAuthGuardService {
  protected extractTokenFromHeader(request: Request): string | undefined {
    if (!request.headers) return undefined;
    if (!request.headers.authorization) return undefined;
    const [type, token] = request.headers.authorization.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

@Injectable()
export class CommonOptionalAuthGuard extends CommonAuthGuardService implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = super.extractTokenFromHeader(request);

    if (token) {
      try {
        request.user = this.jwtService.verify(token);
      } catch (error) {
        throw new ForbiddenException(1016);
      }
    }

    return true;
  }
}

@Injectable()
export class CommonMustAuthGuard extends CommonAuthGuardService implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = super.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException(1016);

    try {
      request.user = this.jwtService.verify(token);
    } catch (error) {
      throw new ForbiddenException(1016);
    }

    return true;
  }
}

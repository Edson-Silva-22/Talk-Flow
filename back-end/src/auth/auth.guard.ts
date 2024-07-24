import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({message: 'Não autorizado', status: 401});
      }

      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
  
      request['user'] = payload;

      return true;
    } catch (error) {
      console.error(error)
      if (error == 'TokenExpiredError: jwt expired') {
        throw new UnauthorizedException({message: 'Sessão expirada.', status: 401});
      }

      throw new UnauthorizedException({message: 'Não autorizado', status: 401});
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    //pegando o token do cabeçalho da requisição
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.TokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,{
                    secret : 'Token-Secret',
                }
                
            );
            request['user'] = payload;
        }catch{
            throw new UnauthorizedException('Token Salah');
        }
        return true;
    }
    private TokenFromHeader(request: Request): string | undefined {
        const token = request.headers?.authorization.replace('Bearer ', '');
        return token;
    }
}

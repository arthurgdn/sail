import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.schema';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization.split(' ')[1];
    const user: User = await this.authService.verify(token, true);
    // Bonus if you need to access your user after the guard
    context.switchToWs().getData().user = user;
    return Boolean(user);
  }
}

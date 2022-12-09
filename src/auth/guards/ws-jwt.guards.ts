import { Injectable, CanActivate } from '@nestjs/common';

import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { TokenFormatDto } from '../dto/token-format.dto';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = verify(
        bearerToken,
        this.configService.get<string>('JWT_SECRET') as string,
      ) as TokenFormatDto;
      return new Promise((resolve, reject) => {
        return this.userService.findOneUserById(decoded.id).then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

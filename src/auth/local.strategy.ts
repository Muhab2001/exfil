import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
<<<<<<< HEAD
    console.log('INISDE LOCAL STG', user);

=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { TokenFormatDto } from './dto/token-format.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    console.log(user);

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload: TokenFormatDto = {
      id: user.id,
      role: user.role,
    };
<<<<<<< HEAD
    console.log('INSIDE LOGIN', user);

=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      username: user.username,
<<<<<<< HEAD
      id: user.id,
=======
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenFormatDto } from './dto/token-format.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenFormatDto): Promise<TokenFormatDto> {
<<<<<<< HEAD
    console.log('INSIDE JWT GUARD', payload);
=======
    console.log('INSIDE JWT GUARD');
>>>>>>> b1194eccbd630b725b289fce1495097d0aee401a

    return payload;
  }
}

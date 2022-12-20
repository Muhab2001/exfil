import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /** An example of an endopint description */

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body('username') username,
    @Body('password') password,
    @Request() req,
  ) {
    console.log('Username:', username, ', password: ', password);

    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req) {
    const {
      password,

      ...result
    } = await this.userService.findOneUserById(req.user.id);
    return { ...result };
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('profile')
  // async profile(@Request() req) {
  //   return { req: {}, msg: 'Yourp profile!' };
  // }

  @UseGuards(AuthGuard('local'))
  @Post('login/admin')
  async adminLogin(
    @Body('username') username,
    @Body('password') password,
    @Request() req,
  ) {
    console.log('Username:', username, ', password: ', password);

    return this.authService.login(req.user);
  }
}

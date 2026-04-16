import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AppException } from 'src/common/exceptions/app.exception';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.authSvc.getUserByUsername(username);
    if (!user)
      throw new UnauthorizedException(
        'El usuario y/o contraseña es incorrecto',
      );

    if (!(await this.utilSvc.checkPassword(password, user.password!)))
      throw new UnauthorizedException(
        'El usuario y/o contraseña son incorrectos',
      );

    const roles = user.roles.map((ur) => ur.role.name);
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      roles,
    };

    const access_token = await this.utilSvc.generateJWT(payload, '1h');
    const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
    const hashRT = await this.utilSvc.hash(refresh_token);

    await this.authSvc.updateHash(user.id, hashRT);

    return { access_token, refresh_token: hashRT };
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  public getProfile(@Req() request: any) {
    return request['user'];
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    const sessionUser = request['user'];
    const user = await this.authSvc.getUserById(sessionUser.id);
    if (!user || !user.hash)
      throw new AppException('Token invalido', HttpStatus.FORBIDDEN, '2');

    if (sessionUser.hash != user.hash)
      throw new AppException('Token invalido', HttpStatus.FORBIDDEN, '2');

    const roles = user.roles.map((ur) => ur.role.name);
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      roles,
    };

    const access_token = await this.utilSvc.generateJWT(payload, '1h');
    const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
    const hashRT = await this.utilSvc.hash(refresh_token);
    await this.authSvc.updateHash(user.id, hashRT);

    return { access_token, refresh_token: hashRT };
  }

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  public async logout(@Req() request: any) {
    const session = request['user'];
    await this.authSvc.updateHash(session.id, null);
  }
}

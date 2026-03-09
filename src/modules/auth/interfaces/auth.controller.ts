import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  // POST /auth/register - 201 Created
  @Post()
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: LoginDto): string {
    const { username, password } = loginDto;
    //TODO: Verificar usuario y contraseña
    //TODO: Obtener la informacion (payload)
    //TODO: Generar token JWT
    //TODO: Devolver el token JWT encriptado

    return this.authSvc.login();
  }

  @Get('/me')
  public getProfile() {}

  @Post('/refresh')
  public refreshToken() {}
  @Post('/logout')
  public logout() {}
}

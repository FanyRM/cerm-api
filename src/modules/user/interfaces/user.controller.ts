import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('/api/user')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class UserController {
  constructor(private usersvc: UserService) {}

  @Get('')
  async getAllUsers() {
    return await this.usersvc.getAllUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.usersvc.getUserById(id);
    if (!result) {
      throw new HttpException(
        `Usuario con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  @Post('')
  public async insertUser(@Body() user: CreateUserDto) {
    return await this.usersvc.insertUser(user);
  }

  @Put(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return await this.usersvc.updateUser(id, user);
  }

  @Delete(':id')
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersvc.deleteUser(id);
    return { message: `Usuario con ID ${id} eliminado` };
  }
}

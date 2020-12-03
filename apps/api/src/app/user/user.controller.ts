import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserRole } from '../../../../../libs/models';
import { Roles, RolesGuard } from '../core/guards';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private _userService: UserService) { }

  @ApiResponse({ status: 200, type: User, isArray: true })
  @Get()
  // @Roles(UserRole.Admin)
  // @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  getAll() {
    return this._userService.findAll();
  }

  @ApiResponse({ status: 200, type: User })
  @Post()
  // @Roles(UserRole.Admin)
  // @UseGuards(RolesGuard)
  @UseGuards(AuthGuard())
  createNew(@Body() data: User) {
    return this._userService.create(data);
  }

}
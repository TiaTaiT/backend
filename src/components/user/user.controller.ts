import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { AvailableRoles } from '../role/roles.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(AvailableRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(+id);
  }

  @Get('avatar/:fileId')
  getAvatar(@Param('fileId') fileId, @Res() res) {
    res.sendFile(fileId, { root: 'static/avatars' });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

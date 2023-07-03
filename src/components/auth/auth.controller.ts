import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Post('/registration')
  async registration(@Body() registerDto: RegisterDto) {
    const token = await this.authService.register(registerDto);
    return { token };
  }
}

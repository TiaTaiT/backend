import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const token = await this.authService.login(loginDto);
    return { token };
  }

  @Post('/verify-jwt')
  async verifyJwt(@Body() payload: { jwt: string }) {
    const token = await this.authService.verifyJwt(payload.jwt);
    return { token };
  }

  @Post('/registration')
  async registration(@Body() registerDto: RegisterDto) {
    const token = await this.authService.register(registerDto);
    return token;
  }
  /*
  @Post('/registration')
  @UseInterceptors(FileInterceptor('avatar'))
  async registration(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg)',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 4,
        })
        .build(),
    )
    avatar: Express.Multer.File,
    @Body() registerDto: RegisterDto,
  ) {
    const token = await this.authService.register(registerDto, avatar.filename);
    return { token };
  }
  */
}

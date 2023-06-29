import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email, roles: user.roles };
    console.log(payload);
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = registerDto.name;
    user.firstName = registerDto.firstName;
    user.lastName = registerDto.lastName;
    user.email = registerDto.email;
    user.password = hashedPassword;

    return await this.userService.create(user);
  }
}

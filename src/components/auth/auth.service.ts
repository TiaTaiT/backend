import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OperationCanceledException } from 'typescript';
import { plainToInstance } from 'class-transformer';

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
    return this.jwtService.sign({ user });
  }

  async register(registerDto: RegisterDto): Promise<string> {
    const { email, password } = registerDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const user = plainToInstance(User, registerDto);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.avatar = '';

    const newUser = await this.userService.create(user);

    if (!newUser) {
      throw new OperationCanceledException();
    }

    const payload = {
      id: newUser.id,
      email: newUser.email,
      roles: newUser.roles,
    };
    return this.jwtService.sign(payload);
  }

  async verifyJwt(jwt: string): Promise<[user: number, exp: number]> {
    try {
      console.log('Look at this 1: ', jwt);
      const { user, exp } = await this.jwtService.verifyAsync(jwt);
      const id = user.id;
      console.log('Look at this 2: ', { id, exp });
      return [id, exp];
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}

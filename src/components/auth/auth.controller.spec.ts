import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should return a JWT token when valid credentials are provided', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: '1@1.ru',
        password: '123456',
      };

      const token = 'JWT-SECRET';
      jest.spyOn(authService, 'login').mockResolvedValue(token);

      // Act
      const result = await authController.login(loginDto);

      // Assert
      expect(result).toEqual({ access_token: token });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  it('should throw an UnauthorizedException when invalid credentials are provided', async () => {
    // Arrange
    const loginDto: LoginDto = {
      email: 'a@mail.ru',
      password: 'incorrect-password',
    };

    jest
      .spyOn(authService, 'login')
      .mockRejectedValue(new UnauthorizedException());

    // Act and Assert
    await expect(authController.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });
});

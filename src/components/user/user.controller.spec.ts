import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockImplementation((id: number) => {
              return {
                id,
                name: 'Test User',
                email: 'test@example.com',
                password: 'password',
                firstName: 'Test',
                lastName: 'User',
                roles: [],
              };
            }),
            /*
            create: jest.fn().mockImplementation((user: User) => {
              return {
                id: 1,
                ...user,
              };
            }),
            */
            update: jest.fn().mockImplementation((id: number, user: User) => {
              return {
                id,
                ...user,
              };
            }),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        roles: [],
        comparePassword: function (password: string): Promise<boolean> {
          return bcrypt.compare(password, this.password);
        },
      };
      jest.spyOn(service, 'findUser').mockResolvedValueOnce(result);
      expect(await controller.findUser('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        roles: [],
        comparePassword: function (password: string): Promise<boolean> {
          return bcrypt.compare(password, this.password);
        },
      };
      const updatedUser: User = {
        id: 1,
        name: 'Updated User',
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
        roles: [],
        comparePassword: function (password: string): Promise<boolean> {
          return bcrypt.compare(password, this.password);
        },
      };
      jest.spyOn(service, 'update').mockResolvedValueOnce(updatedUser);
      expect(await controller.update('1', user)).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(service, 'remove');
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

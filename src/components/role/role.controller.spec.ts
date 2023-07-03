import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotFoundException } from '@nestjs/common';

describe('RoleController', () => {
  let roleController: RoleController;
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: {},
        },
      ],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('findAllRoles', () => {
    it('should return an array of roles', async () => {
      // Arrange
      const roles: Role[] = [
        {
          id: 1,
          name: 'ADMIN',
          description: 'Administrator role',
          users: [],
        },
      ];
      jest.spyOn(roleService, 'findAll').mockResolvedValue(roles);

      // Act
      const result = await roleController.findAll();

      // Assert
      expect(result).toEqual(roles);
      expect(roleService.findAll).toHaveBeenCalled();
    });
  });

  describe('findRoleById', () => {
    it('should return a role when a valid id is provided', async () => {
      // Arrange
      const roleId = 1;
      const role: Role = {
        id: roleId,
        name: 'ADMIN',
        description: 'Administrator role',
        users: [],
      };
      jest.spyOn(roleService, 'findRole').mockResolvedValue(role);

      // Act
      const result = await roleController.findOne(roleId.toString());

      // Assert
      expect(result).toEqual(role);
      expect(roleService.findRole).toHaveBeenCalledWith(roleId);
    });

    it('should throw a NotFoundException when an invalid id is provided', async () => {
      // Arrange
      const roleId = 999;
      jest
        .spyOn(roleService, 'findRole')
        .mockRejectedValue(new NotFoundException());

      // Act and Assert
      await expect(roleController.findOne(roleId.toString())).rejects.toThrow(
        NotFoundException,
      );
      expect(roleService.findRole).toHaveBeenCalledWith(roleId);
    });
  });

  describe('createRole', () => {
    it('should create a role and return the created role', async () => {
      // Arrange
      const createRoleDto: CreateRoleDto = {
        name: 'TEST',
        description: 'Test role',
      };

      const createdRole: Role = {
        id: 1,
        ...createRoleDto,
        users: [],
      };

      jest.spyOn(roleService, 'create').mockResolvedValue(createdRole);

      // Act
      const result = await roleController.create(createRoleDto);

      // Assert
      expect(result).toEqual(createdRole);
      expect(roleService.create).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('updateRole', () => {
    it('should update a role and return the updated role', async () => {
      // Arrange
      const roleId = ;
      const updateRoleDto: UpdateRoleDto = {
        name: 'MODERATOR',
        description: 'Moderator role',
      };

      const updatedRole: Role = {
        id: roleId,
        ...updateRoleDto,
        users: [],
      };

      jest.spyOn(roleService, 'update').mockResolvedValue;
      // Act
      const result = await roleController.update(
        roleId.toString(),
        updateRoleDto,
      );

      // Assert
      expect(result).toEqual(updatedRole);
      expect(roleService.update).toHaveBeenCalledWith(roleId, updateRoleDto);
    });

    it('should throw a NotFoundException when updating a role with an invalid id', async () => {
      // Arrange
      const roleId = 999;
      const updateRoleDto: UpdateRoleDto = {
        name: 'MODERATOR',
        description: 'Moderator role',
      };

      jest
        .spyOn(roleService, 'update')
        .mockRejectedValue(new NotFoundException());

      // Act and Assert
      await expect(
        roleController.update(roleId.toString(), updateRoleDto),
      ).rejects.toThrow(NotFoundException);
      expect(roleService.update).toHaveBeenCalledWith(roleId, updateRoleDto);
    });
  });
  /*
  describe('deleteRole', () => {
    it('should delete a role and return the deleted role', async () => {
      // Arrange
      const roleId = 1;
      const deletedRole: Role = {
        id: roleId,
        name: 'ADMIN',
        description: 'Administrator role',
        users: [],
      };
      jest.spyOn(roleService, 'remove').mockResolvedValue();
      // Act
      const result = await roleController.remove(roleId.toString());

      // Assert
      expect(result).toEqual(deletedRole);
      expect(roleService.remove).toHaveBeenCalledWith(roleId);
    });

    it('should throw a NotFoundException when deleting a role with an invalid id', async () => {
      // Arrange
      const roleId = 999;
      jest
        .spyOn(roleService, 'remove')
        .mockRejectedValue(new NotFoundException());

      // Act and Assert
      await expect(roleController.remove(roleId.toString())).rejects.toThrow(
        NotFoundException,
      );
      expect(roleService.remove).toHaveBeenCalledWith(roleId);
    });
  });
  */
});

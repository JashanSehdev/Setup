import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity.js';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { GoogleAuthDto } from '../auth/dto/google.dto.js';
import { paginationResponse } from '../common/utlis/pagination.js';
import { FilterUserDto } from './dto/filter-user-dto.js';
import { SORT } from '../common/enum/filter.enum.js';
import { BaseService } from '../common/service/base.service.js';
import { successResponse } from '../common/utlis/response.js';
import { BaseUser, Me } from './interfaces/user.interface.js';

Injectable();
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findUsers(userId: number, query: FilterUserDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const where: FindOptionsWhere<User> = {};
    const order: FindOptionsOrder<User> = {};

    where.id = Not(userId);

    if (query.sortBy) {
      if (query.sortBy === SORT.NAME) {
        order.username = 'ASC';
      }
    } else if (query.sortBy) {
      if (query.sortBy === SORT.CREATEDAT) {
        order.createdAt = 'ASC';
      }
    } else if (query.sortBy) {
      if (query.sortBy === SORT.UPDATEDAT) {
        order.updatedAt = 'ASC';
      }
    }
    if (query.status) {
      where.status = query.status;
    }

    if (query.orderBy) {
      order.createdAt = query.orderBy;
    }

    if (query.search) {
      where.username = ILike(`%${query.search}%`);
    }

    if (query.role) {
      where.role = query.role;
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        status: true,
        createdAt: true,
      },
      order,
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginationResponse(data, page, limit, total);
  }

  async createWithGoogle(createUser: GoogleAuthDto): Promise<BaseUser> {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async getUser(id: number): Promise<BaseUser> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async getMe(userId: number): Promise<Me> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
      },
    });


    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user
  }

  async findOne(id: number): Promise<BaseUser | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        role: true,
        avatar: true,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByGoogleID(googleId: string): Promise<BaseUser | null> {
    const user = await this.userRepository.findOneBy({ googleId });
    if (!user) return null;

    const { password, ...rest } = user;

    return rest;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async changeAvatar(userId: number, avatar: string) {
    const user = this.findOne(userId);

    if (!user) throw new NotFoundException('User not found');

    const update = await this.update(userId, { avatar });

    if (!update)
      throw new InternalServerErrorException('Unable to change avatar');

    return successResponse('Avatar change Successfully', { avatar });
  }
}

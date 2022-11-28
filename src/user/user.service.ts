import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  getDefaultUserDTO(user: CreateUserDto): CreateUserDto {
    const EMPTY_STRING = '';
    const userDTO = new CreateUserDto();
    userDTO.userId = user.userId || `A${dayjs().format('ssYYmmMMHHDD')}`;
    userDTO.email = user.email;
    userDTO.password = user.password;
    userDTO.username = user.username || user.email;
    userDTO.firstName = user.firstName || EMPTY_STRING;
    userDTO.lastName = user.lastName || EMPTY_STRING;
    userDTO.phone = user.phone || null;
    userDTO.status = user.status || 'new';
    userDTO.role = user.role || 'user';
    userDTO.activeCode = user.activeCode || null;
    userDTO.sendNumber = user.sendNumber || 1;
    userDTO.createdAt = user.createdAt || new Date();
    userDTO.updatedAt = user.updatedAt || new Date();

    return userDTO;
  }

  async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async create(dto: CreateUserDto) {
    const user = await this.getByEmail(dto.email);

    if (user) {
      throw new NotAcceptableException('Email đã được đăng ký.');
    }

    return await this.userRepository.save(this.userRepository.create(this.getDefaultUserDTO(dto)));
  }

  async updateActiveCode(email: string, activeCode: string, sendNumber: number) {
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        activeCode,
        sendNumber,
      })
      .where('email = :email', { email })
      .execute();
  }

  async activeUserAccount(email: string, activeCode: string) {
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        status: 'active',
        activeCode: '',
        sendNumber: 0,
      })
      .where('email = :email', { email })
      .andWhere('active_code = :activeCode', { activeCode })
      .execute();
  }

  async getActiveCode(activeCode: string) {
    return await this.userRepository
      .createQueryBuilder()
      .select('id')
      .where('active_code = :activeCode', { activeCode })
      .getRawOne();
  }

  async updateChartOptions(chartOptions: string, userId: string) {
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        chartOptions,
      })
      .where('id = :userId', { userId })
      .execute();
  }
}

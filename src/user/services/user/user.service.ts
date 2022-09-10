import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { RegisterDto } from 'src/user/dtos/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public findUsers() {}

  public getDefaultUserDTO(user: CreateUserDto): CreateUserDto {
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

  public async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.email =:email')
      .setParameter('email', email)
      .getOne();
  }

  public async registerUser(dto: RegisterDto): Promise<User> {
    const user = await this.getByEmail(dto.email);

    if (user) {
      throw new NotAcceptableException('The email is exists');
    }
    const result = await this.userRepository.save(
      this.userRepository.create(this.getDefaultUserDTO(dto)),
    );

    return result;
  }
}

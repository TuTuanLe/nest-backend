import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  userId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  status?: string;
  role?: string;
  activeCode?: string;
  sendNumber?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

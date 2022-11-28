import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Hash } from '../common/helpers/Hash';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    // if (!user || !Hash.compare(password, user.password)) {
    //   throw new UnauthorizedException('Email hoặc mật khẩu không đúng!');
    // }

    // if (user.status !== 'active') {
    //   throw new UnauthorizedException('Tài khoản chưa kích hoạt!');
    // }

    return user;
  }

  createToken(user: User) {
    const { id } = user;
    const payload = { sub: id };
    return this.jwtService.sign(payload);
  }
}

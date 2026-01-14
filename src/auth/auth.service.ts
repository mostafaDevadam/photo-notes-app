import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    return await this.usersService.create(createUserDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ id: any, accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { id: user._id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { id: payload.id, accessToken };
  }

}

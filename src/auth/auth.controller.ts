import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const auth = await this.authService.signUp(createUserDto);
         return { statusCode: 200, message: 'SignUp successfully', data: auth }
    }

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        const auth = await this.authService.signIn(signInDto);
         return { statusCode: 200, message: 'SignIn successfully', data: auth }
    }


}

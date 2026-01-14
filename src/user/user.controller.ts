import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/all")
    async findAll() {
        const users = await this.userService.findAll();
         return { statusCode: 200, message: 'Get all users successfully', data: users }
    }
}

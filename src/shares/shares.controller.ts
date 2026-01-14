import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SharesService } from './shares.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateShareDto } from './dto/createshare.dto';

@Controller('shares')
@UseGuards(AuthGuard)
export class SharesController {
    constructor(private readonly shareService: SharesService) { }

    @Post("/user/:userId")
    async createShare(@Param("userId") userId: any,
        @Body() createShareDto: CreateShareDto) {
        const shared = await this.shareService.createByUserId(userId, createShareDto);
        return { statusCode: 200, message: 'Created Share successfully', data: shared }
    }

    @Get("/all/user/:userId")
    async getAllSharesByUserId(@Param("userId") userId: any) {
        const shares= await this.shareService.findAllByUserId(userId);
          return { statusCode: 200, message: 'Get all shares by user successfully', data: shares }
    }

    @Get("/all/share/:share")
    async getAllSharesByShare(@Param("share") share: any) {
        const shares = await this.shareService.findAllByShare(share);
         return { statusCode: 200, message: 'Get all shares by share successfully', data: shares }
    }

    @Delete("/:id")
    async deleteShare(@Param("id") id: any) {
        const removed = await this.shareService.remove(id);
        return { statusCode: 200, message: 'Deleted Share successfully', data: removed }
    }

}

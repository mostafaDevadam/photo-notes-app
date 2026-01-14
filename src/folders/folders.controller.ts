import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('folders')
@UseGuards(AuthGuard)
export class FoldersController {
    constructor(private folderService: FoldersService) { }
    
    
        @Post("/user/:userId")
        async createFolderByUserId(@Param("userId") userId: any, @Body() createFolderDto: any) {
            console.log("createFolderDto:",createFolderDto)
            createFolderDto.user = userId;
            const folder = await this.folderService.createByUserId(createFolderDto);
            return { statusCode: 200, message: 'created folder successfully', data: folder }
        }
    
        @Get("/all/user/:userId")
        async findAllFoldersByUserId(@Param("userId") userId: any) {
            const folders = await this.folderService.findAllByUserId(userId);
            return { statusCode: 200, message: 'Get all folders successfully', data: folders }
        }
    
        @Get("/:id")
        async getFolderById(@Param("id") id: any) {
            const folder = await this.folderService.findById(id);
            return { statusCode: 200, message: 'Get folder successfully', data: folder }
        }
    
        @Patch("/:id")
        async updateFolderById(@Param("id") id: any, @Body() updateNoteDto: any) {
            const folder = await this.folderService.updateById(id, updateNoteDto);
            return { statusCode: 200, message: 'Updated folder successfully', data: folder }
        }
    
        @Delete("/:id")
        async deleteFolderById(@Param("id") id: any) {
            const removed = await this.folderService.deleteById(id);
            return { statusCode: 200, message: 'Removed Folder successfully', data: removed }
        }
}

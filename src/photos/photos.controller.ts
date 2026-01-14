import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

@Controller('photos')
@UseGuards(AuthGuard)
export class PhotosController {

f
    private readonly baseUrl = process.env.BASE_URL || 'http://localhost:8000';

    constructor(private photoService: PhotosService) { }

    @Post("/upload/user/:userId")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: join(__dirname, '..', '..', '../upload'),
            filename(req, file, callback) {
                const uniqueName = `${uuidv4()}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`
                //callback(null, `${Date.now()}-${file.originalname}`);
                callback(null, uniqueName);
            },
        }),
         fileFilter: (req, file: Express.Multer.File, callback) => {
         if (!file.mimetype.match(/^image\/(jpg|jpeg|png|webp)$/)) {
            return callback(new BadRequestException('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
    }))
    async uploadPhotoByUserId(@Param("userId") userId: any,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    //new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
                    //new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
                ],
                fileIsRequired: true,
            })
        ) file: Express.Multer.File, res: Response) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        
        console.log("file:", file)

        const imageUrl = `${this.baseUrl}/upload/${file.filename}`;
        const createPhotoDto = {
            url: imageUrl,
            user: userId,
        }
        const photo = await this.photoService.uploadByUserId(userId, createPhotoDto);
        if(!photo) throw new BadRequestException('Image upload failed');
        return {statusCode: 200, message: 'Image uploaded successfully', data: photo}
    }

    @Get("/all/user/:userId")
    async getPhotosByUserId(@Param("userId") userId: any) {
        const photos = await this.photoService.findAllByUserId(userId);
         return { statusCode: 200, message: 'Get all photos by user successfully', data: photos }
    }

    @Get("/all/folder/:folderId")
    async getPhotosByFolderId(@Param("folderId") folderId: any) {
        const photos = await this.photoService.findAllByFolderId(folderId);
         return { statusCode: 200, message: 'Get all photos by folder successfully', data: photos }
    }

    @Get("/all/note/:noteId")
    async getPhotosByNoteId(@Param("noteId") noteId: any) {
        const photos = await this.photoService.findAllByNoteId(noteId);
         return { statusCode: 200, message: 'Get all photos by note successfully', data: photos }
    }

    @Get("/:id")
    async getPhotoById(@Param("id") id: any) {
        const photo = await this.photoService.findById(id);
         return { statusCode: 200, message: 'Get photo successfully', data: photo }
    }

    @Patch("/:id")
    async updatePhoto(@Param("id") id: any, @Body() updatePhotoDto: any) {
        // patch: add folderId or noteId
        const photo = await this.photoService.update(id, updatePhotoDto);
         return { statusCode: 200, message: 'Updated photo successfully', data: photo }
    }

    @Delete("/:id")
    async removePhoto(@Param("id") id: any) {
        const removed = await this.photoService.remove(id);
         return { statusCode: 200, message: 'Removed photo successfully', data: removed }
    }



}

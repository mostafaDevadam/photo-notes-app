import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
    constructor(private noteService: NotesService) { }


    @Post("/user/:userId")
    async createNoteByUserId(@Param("userId") userId: any, @Body() createNoteDto: any) {
        createNoteDto.user = userId;
        const note = await this.noteService.createByUserId(createNoteDto);
        return { statusCode: 200, message: 'Created note successfully', data: note }
    }

    @Get("/all/user/:userId")
    async findAllNotesByUserId(@Param("userId") userId: any) {
        const notes = await this.noteService.findAllByUserId(userId);
        return { statusCode: 200, message: 'Get all notes by user successfully', data: notes }
    }

    @Get("/:id")
    async getNoteById(@Param("id") id: any) {
        const note = await this.noteService.findById(id);
        return { statusCode: 200, message: 'Get note successfully', data: note }
    }

    @Patch("/:id")
    async updateNoteById(@Param("id") id: any, @Body() updateNoteDto: any) {
        const note = await this.noteService.updateById(id, updateNoteDto);
        return { statusCode: 200, message: 'Updated note successfully', data: note }
    }

    @Delete("/:id")
    async deleteNoteById(@Param("id") id: any) {
        const removed = await this.noteService.deleteById(id);
        return { statusCode: 200, message: 'Removed note successfully', data: removed }
    }



}

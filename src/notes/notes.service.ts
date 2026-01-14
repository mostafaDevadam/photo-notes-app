import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {

    constructor(
        @InjectModel(Note.name) private noteModel: Model<Note>,
    ) { }

    async createByUserId(createNoteDto: any) {
          const note = new this.noteModel(createNoteDto);
          return note.save();
    }

    async findAllByUserId(userId: any) {
          return await this.noteModel.find({ user: userId }).exec();
    }

    async findById(id: any){
         return await this.noteModel.findById(id).exec();
    }

    async updateById(id: any, updateNoteDto: any){
          return await this.noteModel.findByIdAndUpdate(id, updateNoteDto, {new: true}).exec(); 
    }

    async deleteById(id: any){
        return await this.noteModel.findByIdAndDelete(id).exec();
    }
}

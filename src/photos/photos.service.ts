import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from './photo.schema';
import { Model } from 'mongoose';

@Injectable()
export class PhotosService {
    constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) { }

    async uploadByUserId(userId: any, createPhotoDto: any) {
        return await this.photoModel.create({...createPhotoDto, user: userId});
    }

    async findAllByUserId(userId: any) {
        return await this.photoModel.find({ user: userId }).exec();
    }
    async findAllByFolderId(folderId: any) {
        return await this.photoModel.find({ folder: folderId }).exec();
    }
    async findAllByNoteId(noteId: any) {
        return await this.photoModel.find({ note: noteId }).exec();
    }
    async findById(id: any) {
         return await this.photoModel.findById(id).exec();
    }
    async update(id: any, updatePhotoDto: any) {
       return await this.photoModel.findByIdAndUpdate(id, updatePhotoDto, {new: true}).exec();
    }
    async remove(id: any) {
       return await this.photoModel.findByIdAndDelete(id).exec();
    }
}

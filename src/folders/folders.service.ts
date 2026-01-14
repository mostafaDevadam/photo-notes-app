import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './folder.schema';


@Injectable()
export class FoldersService {
      constructor(
            @InjectModel(Folder.name) private folderModel: Model<Folder>,
        ) { }

        async createByUserId(createFolderDto: any) {
          const note = new this.folderModel(createFolderDto);
          return note.save();
    }

    async findAllByUserId(userId: any) {
          return await this.folderModel.find({ user: userId }).exec();
    }

    async findById(id: any){
         return await this.folderModel.findById(id).exec();
    }

    async updateById(id: any, updateFolderDto: any){
          return await this.folderModel.findByIdAndUpdate(id, updateFolderDto, {new: true}).exec(); 
    }

    async deleteById(id: any){
        return await this.folderModel.findByIdAndDelete(id).exec();
    }
}

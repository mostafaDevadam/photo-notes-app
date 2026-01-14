import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collaboration } from './collaboration.schema';
import { Model } from 'mongoose';

@Injectable()
export class CollaborationsService {
    constructor(
        @InjectModel(Collaboration.name) private collaborationModel: Model<Collaboration>,
    ) { }

    // add member
    // get all be member

    async createByNoteId(noteId: any) {
        const collaboration = await this.findOneByNoteId(noteId);
        if(collaboration){
            return collaboration;
        }else{
            const collaboration = new this.collaborationModel({ note: noteId });
            return collaboration.save();
        }
        
    }

    async addMember(collaborationId: any, member: any) {
        // get collaboration by noteId
        // if: exist then update member in members ,else: not exist, create a new collaboration
        const collaboration = await this.findOneById(collaborationId);
        if(collaboration){
            return await this.collaborationModel.findOneAndUpdate(collaborationId, { $addToSet: { members: member } }, { new: true }).exec();
        }
       // return await this.collaborationModel.findOneAndUpdate(collaborationId, { $addToSet: { members: member } }, { new: true }).exec();
    }

    async findAllByMember(member: any) {
        return await this.collaborationModel.find({ members: { $in: [member] } }).populate('members').populate('note').exec();
    }

    async findOneById(id: any) {
        return await this.collaborationModel.findById(id).populate('members').populate('note').exec();
    }

    async findOneByNoteId(noteId: any){
        return await this.collaborationModel.findOne({ note: noteId }).exec();
    }

    async removeMember(collaborationId: any, member: any) {
        return await this.collaborationModel.findOneAndUpdate(collaborationId, { $pull: { members: member } }, { new: true }).exec();
    }

    async remove(id: any) {
        return await this.collaborationModel.findByIdAndDelete(id).exec();
    }


}

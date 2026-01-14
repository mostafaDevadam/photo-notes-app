import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invitation } from './invitation.schema';
import { Model } from 'mongoose';
import { CollaborationsService } from 'src/collaborations/collaborations.service';

@Injectable()
export class InvitationsService {
    constructor(
        @InjectModel(Invitation.name) private invModel: Model<Invitation>,
        private readonly collService: CollaborationsService,
    ) { }

    async createByUser(userId: any, createInvitationDto: any) {
        const invitation = new this.invModel({...createInvitationDto, user: userId});
        return invitation.save();
    }

    async findAllByUserId(userId: any) {
        return await this.invModel.find({ user: userId }).exec();
    }

    async findAllBySenderId(senderId: any) {
        return await this.invModel.find({ sender: senderId }).exec();
    }

    async findAllByReceiverId(receiverId: any) {
        return await this.invModel.find({ receiver: receiverId }).exec();
    }

    async confirm(id: any, data: { isConfirmed: boolean, isCanceled: boolean }) {

       
        if (data.isConfirmed) {
             // update isConfirmed in invitation
            const updated = await this.invModel.findByIdAndUpdate(id, { isConfirmed: data.isConfirmed }, { new: true }).exec();
            // get noteId from invitation
            const noteId = updated.note;
            // create a new collaboration
            const collaboration = await this.collService.createByNoteId(noteId);
            // get collaboration-id
            const collId = collaboration._id;
            // add sender, receiver in collboration members, noteId in collboration
            await this.collService.addMember(collId, updated.sender);
            await this.collService.addMember(collId, updated.receiver);
            return updated
        }

        if(data.isCanceled){
             // update isConfirmed in invitation
            const updated = await this.invModel.findByIdAndUpdate(id, { isCanceled: data.isCanceled }, { new: true }).exec();
            return updated

        }

        return false

        

    }

    async update(id: any, updateInvitationDto: any) {
        return await this.invModel.findOneAndUpdate(id, updateInvitationDto, { new: true }).exec();
    }

    async remove(id: any) {
        return await this.invModel.findByIdAndDelete(id).exec();
    }

}

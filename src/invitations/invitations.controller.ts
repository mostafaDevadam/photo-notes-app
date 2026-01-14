import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitations')
@UseGuards(AuthGuard)
export class InvitationsController {
    constructor(private readonly invService: InvitationsService) { }
    // post create by userId: user, note, sender, receiver, message 
    @Post('/user/:userId')
    async createInvitationByUserId(@Param("userId") userId: any, @Body() createInvitationDto: CreateInvitationDto) {
          const invitation = await this.invService.createByUser(userId, createInvitationDto);
          return { statusCode: 200, message: 'Created invitation successfully', data: invitation }
    }

    // patch confirm by invitationId: add sender, receiver in collboration members, noteId in collboration,  
    @Patch('/confirm/:invitationId')
    async confirmInvitation(@Param("invitationId") invitationId: any, @Body() body: { isConfirmed: boolean, isCanceled: boolean }) {
        const invitation = await this.invService.confirm(invitationId, body);
        return { statusCode: 200, message: 'Confirmed invitation successfully', data: invitation }
    }

    // get all by userid
    @Get('/all/user/:userId')
    async findAllInvitationsByUserId(@Param("userId") userId: any) {
        const invitations = await this.invService.findAllByUserId(userId);
        return { statusCode: 200, message: 'Get all invitations by user successfully', data: invitations }
    }

    // get all by sender
    @Get("/all/sender/:senderId")
    async findAllInvitationsBySenderId(@Param("senderId") senderId: any) {
        const invitations = await this.invService.findAllBySenderId(senderId);
        return { statusCode: 200, message: 'Get all invitations by sender successfully', data: invitations }
    }

    // get all by receiver
    @Get("/all/receiver/:receiverId")
    async findAllInvitationsByReceiverId(@Param("receiverId") receiverId: any) {
        const invitations = await this.invService.findAllByReceiverId(receiverId);
        return { statusCode: 200, message: 'Get all invitations by receiver successfully', data: invitations }
    }

    // update
    @Patch('/:id')
    async updateInvitation(@Param("id") id: any, @Body() updateInvitationDto: UpdateInvitationDto) {
        const updatedInvitation = await this.invService.update(id, updateInvitationDto);
        return { statusCode: 200, message: 'Updated invitation successfully', data: updatedInvitation }
    }

    // remove 
    @Delete('/:id')
    async removeInvitation(@Param("id") id: any) {
        const removedInvitation = await this.invService.remove(id);
        return { statusCode: 200, message: 'Removed invitation successfully', data: removedInvitation }
    }
}

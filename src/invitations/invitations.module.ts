import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './invitation.schema';
import { CollaborationsModule } from 'src/collaborations/collaborations.module';

@Module({
  imports: [
          MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
          CollaborationsModule,
  ],
  providers: [InvitationsService],
  controllers: [InvitationsController]
})
export class InvitationsModule {}

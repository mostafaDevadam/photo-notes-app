import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collaboration, CollaborationSchema } from './collaboration.schema';

@Module({
  imports: [
          MongooseModule.forFeature([{ name: Collaboration.name, schema: CollaborationSchema }]),
  ],
  providers: [CollaborationsService],
  controllers: [CollaborationsController],
  exports: [CollaborationsService]
})
export class CollaborationsModule {}

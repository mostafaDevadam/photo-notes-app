import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NotesGateway } from './notes.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
        UserModule,
     
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesGateway]
})
export class NotesModule {}

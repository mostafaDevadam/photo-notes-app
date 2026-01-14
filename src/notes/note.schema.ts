import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {

    @Prop({ required: true })
    content: string;

    @Prop({ type: Boolean, default: false, required: false, })
    isPublic: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId
}

export const NoteSchema = SchemaFactory.createForClass(Note);

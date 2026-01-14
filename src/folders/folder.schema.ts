import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ timestamps: true })
export class Folder {

    @Prop({ required: true, })
    name: string;

    @Prop({ required: false, })
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId
}

export const FolderSchema = SchemaFactory.createForClass(Folder);

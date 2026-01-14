import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema({ timestamps: true })
export class Photo {

    @Prop({ required: true })
    url: string;

    @Prop({ required: false })
    description: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder', required: false })
    folder: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Note', required: false })
    note: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);

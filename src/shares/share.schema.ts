import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type ShareDocument = HydratedDocument<Share>;

@Schema({ timestamps: true })
export class Share {

    /*@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Photo', required: false })
    photo: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Folder', required: false })
    folder: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Note', required: false })
    note: MongooseSchema.Types.ObjectId*/

    @Prop({ type: MongooseSchema.Types.ObjectId, refPath: 'state' , required: true})
    share: MongooseSchema.Types.ObjectId

    @Prop({ type: String,  enum: ['Photo', 'Folder', 'Note'], required: true})
    state: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId
}

export const ShareSchema = SchemaFactory.createForClass(Share);

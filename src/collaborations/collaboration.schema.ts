import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type CollaborationDocument = HydratedDocument<Collaboration>;

@Schema({ timestamps: true })
export class Collaboration {
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User', required: false })
    members: MongooseSchema.Types.ObjectId[]
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Note', required: true, unique: true })
    note: MongooseSchema.Types.ObjectId

}

export const CollaborationSchema = SchemaFactory.createForClass(Collaboration);

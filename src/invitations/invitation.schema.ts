import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema({ timestamps: true })
export class Invitation {

    @Prop({ type: String, default: 'invited you' })
    message: string;

    @Prop({ type: Boolean, default: true, required: false, })
    isInvited: boolean;

    @Prop({ type: Boolean, default: false, required: false, })
    isConfirmed: boolean;

    @Prop({ type: Boolean, default: false, required: false, })
    isCanceled: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Note', required: true })
    note: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    sender: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    receiver: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

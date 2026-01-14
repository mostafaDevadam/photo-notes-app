import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  fullName: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
/*
// Pre-save middleware for password hashing
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
*/
// Pre-save hook to hash the password before saving the user
UserSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10); // You can adjust the salt rounds for security
    this.password = await bcrypt.hash(this.password, salt);
    
  } catch (error) {
   throw error;
  }
});
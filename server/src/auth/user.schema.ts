import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  tag: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  tokens: string[];
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.password) {
    this.password = await argon2.hash(this.password);
    next();
  }
});

export { UserSchema };

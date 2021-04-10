import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  content: string;

  @Prop()
  from: User;
}
const MessageSchema = SchemaFactory.createForClass(Message);
export { MessageSchema };

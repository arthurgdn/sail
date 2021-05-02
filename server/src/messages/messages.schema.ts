import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Conversation } from 'src/conversations/conversations.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' })
  conversation: Conversation;

  @Prop()
  from: User;
}
const MessageSchema = SchemaFactory.createForClass(Message);
export { MessageSchema };

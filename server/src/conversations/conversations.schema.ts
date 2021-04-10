import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { Message } from 'src/messages/messages.schema';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  members: User[];

  @Prop()
  messages: Message[];
}
const ConversationSchema = SchemaFactory.createForClass(Conversation);
export { ConversationSchema };

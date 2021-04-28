import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.schema';
import { AuthenticationMiddleware } from 'src/common/auth.middleware';
import { ConversationsController } from './conversations.controller';
import { Conversation, ConversationSchema } from './conversations.schema';
import { Message } from '../messages/messages.schema';
import { ConversationsService } from './conversations.service';

@Module({
  controllers: [ConversationsController],
  imports: [
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
    User,
    Conversation,
    Message,
  ],
  providers: [ConversationsService, AuthService, User, Conversation, Message],
})
export class ConversationsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ConversationsController);
  }
}

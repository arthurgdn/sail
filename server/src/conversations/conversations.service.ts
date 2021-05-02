import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { validate } from 'class-validator';
import { Model, Types } from 'mongoose';
import { PopulatedUser, User, UserDocument } from 'src/auth/user.schema';
import { Message, MessageDocument } from 'src/messages/messages.schema';
import { NewConversationDto } from './conversations.dto';
import { Conversation, ConversationDocument } from './conversations.schema';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(dto: NewConversationDto): Promise<Conversation> {
    // check if invited users exist
    const members: User[] = [];
    for (const member of dto.members) {
      const existingUser = await this.userModel.findOne({ tag: member });
      if (!existingUser) {
        const errors = { user: 'No user found with the corresponding tag' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      members.push(existingUser);
    }
    const conversation = new this.conversationModel({
      _id: Types.ObjectId(),
      members,
      title: '',
      messages: [],
    });
    const errors = await validate(conversation);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await conversation.save();
      return conversation;
    }
  }

  async getConversations(user: UserDocument): Promise<Conversation[]> {
    await user
      .populate({
        path: 'conversations',
      })
      .execPopulate();
    const populatedUser = <PopulatedUser>user;
    if (!populatedUser.conversations) {
      const _errors = { conversations: "Unable to get user's conversations" };
      throw new HttpException(
        { message: 'Element not found', _errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return populatedUser.conversations;
  }
}

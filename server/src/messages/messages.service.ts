import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WsException } from "@nestjs/websockets";
import { validate } from "class-validator";
import { Model } from "mongoose";
import { User } from "src/auth/user.schema";
import {
  Conversation,
  ConversationDocument,
} from "src/conversations/conversations.schema";
import { Message, MessageDocument } from "./messages.schema";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async addMessage(user: User, message: string, room: string){
    const conversation = await this.conversationModel.findById(room);
    if(!conversation){
      throw new WsException('Conversation not found')
    }
    if(!conversation.members.find((member)=>member.tag === user.tag)){
      throw new WsException('You are not in conversation')
    }
    const _message = new this.messageModel({
      content: message,
      from: user,
      conversation,
    })
    const errors = await validate(conversation);
    if (errors.length > 0) {
      throw new WsException(errors);
    } else {
      await _message.save();
      return _message;
    }
  }

  async findMessages(user: User, room: string, limit: number){
    const conversation = await this.conversationModel.findById(room);
    if(!conversation){
      throw new WsException('Conversation not found')
    }
    if(!conversation.members.find((member)=>member.tag === user.tag)){
      throw new WsException('You are not in conversation')
    }
    conversation.populate({
      path: 'messages',
      options : {
        limit : limit,
        sort:{createdAt: 1}
        }
      })
      .execPopulate();
    return conversation.messages;
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/user.decorator';
import { User as UserModel } from '../auth/user.schema';
import { NewConversationDto } from './conversations.dto';
import { ConversationsService } from './conversations.service';

@ApiBearerAuth()
@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  async create(
    @User() user: UserModel,
    @Body('conversation') conversationData: NewConversationDto,
  ) {
    const _conv = await this.conversationsService.create(conversationData);
    return { conversation: _conv };
  }

  @Get('')
  async getConversations(@User() user: UserModel) {
    const _conversations = await this.conversationsService.getConversations(
      user,
    );
    return { conversations: _conversations };
  }
}

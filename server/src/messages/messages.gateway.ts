import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/user.schema';
import { WsJwtGuard } from 'src/common/ws.jwt.guard';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket) {
    const user: User = await this.authService.verify(
      socket.handshake.query.token,
      true,
    );

    // Send list of connected users
    this.server.emit('joined', user.username + ' joined !');
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('message')
  async onMessage(client, data: any) {
    const event = 'message';

    await this.messagesService.addMessage(data.user, data.message, data.room);
    client.broadcast.to(data.room).emit(event, data.message);

    return Observable.create((observer) =>
      observer.next({ event, data: data.message }),
    );
  }
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  async onRoomJoin(client, data: any): Promise<any> {
    client.join(data.room);

    const messages = await this.messagesService.findMessages(
      data.user,
      data.room,
      25,
    );

    // Send last messages to the connected user
    client.emit('message', messages);
  }

  @SubscribeMessage('leave')
  onRoomLeave(client, data: any): void {
    client.leave(data.room);
  }
}

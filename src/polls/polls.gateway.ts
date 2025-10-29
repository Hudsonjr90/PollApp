import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PollsGateway {
  @WebSocketServer()
  server: Server;

  emitPollUpdate(pollId: string, payload: any) {
    this.server.emit(`poll_${pollId}_update`, payload);
  }
}

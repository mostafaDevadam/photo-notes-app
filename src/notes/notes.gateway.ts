import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

interface CursorUpdateData {
  userId: string;
  index: number;
}

interface TypingData {
  userId: string;
  isTyping: boolean;
}

interface JoinData {
  userId: string;
  // name?: any
}

@WebSocketGateway(5000, { cors: true })
export class NotesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UserService) { }
  @WebSocketServer()
  server: Server;
  private userSockets = new Map<string, string>(); // socket.id -> userId
  private logger: Logger = new Logger('NotesGateway');

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected', client.id);
    this.logger.log('New client connected');
    // Request join from client
    client.emit('requestJoin');
  }

  @SubscribeMessage('join')
  async handleJoin(@ConnectedSocket() client: Socket, @MessageBody() data: JoinData) {
    console.log("handleJoin data:", data)
    this.userSockets.set(client.id, data.userId);
    if (data.userId) {
      const user = await this.userService.findById(data.userId);
      console.log("user:", user, user?.fullName || user?.name)
      // Broadcast new user joined
      this.server.emit('userJoined', { userId: data.userId, name: user?.fullName || user?.name });
      this.logger.log(`User ${data.userId} ${user['fullName']!!} joined`);
    }


  }

  
  @SubscribeMessage('onLeave')
  async handleLeave(@ConnectedSocket() client: Socket, @MessageBody() data: any) {

    if(data){
      console.log("handleLeave data:", data)
    }
  }

  async handleDisconnect(client: any) {
    const userId = this.userSockets.get(client.id);
    if (userId) {
      this.userSockets.delete(client.id);
       const user = await this.userService.findById(userId);
      // Broadcast user left to clear states
      this.server.emit('userLeft', { userId , name: user?.fullName});
      this.logger.log(`User ${userId} ${user?.fullName} disconnected`);
    } else {
      this.logger.log('Client disconnected (no userId)');
    }
  }


  @SubscribeMessage('edit')
  handleEdit(@MessageBody() content: any): void {
    this.server.emit('updateContent', content);
  }

  @SubscribeMessage('bold')
  handleBold(@MessageBody() bold: any): void {
    this.server.emit('updateStyleBold', bold);
  }

  @SubscribeMessage('italic')
  handleItalic(@MessageBody() italic: any): void {
    this.server.emit('updateStyleItalic', italic);
  }

  @SubscribeMessage('underline')
  handleUnderline(@MessageBody() underline: any): void {
    this.server.emit('updateStyleUnderline', underline);
  }

  @SubscribeMessage('cursorUpdate')
  handleCursorUpdate(@MessageBody() data: CursorUpdateData): void {
    this.server.emit('cursorUpdate', data);
  }

  // New: Typing indicators
  @SubscribeMessage('typingStart')
  handleTypingStart(@MessageBody() data: TypingData): void {
    this.server.emit('typingUpdate', data);
  }

  @SubscribeMessage('typingStop')
  handleTypingStop(@MessageBody() data: TypingData): void {
    this.server.emit('typingUpdate', data);
  }
}

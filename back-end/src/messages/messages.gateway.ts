import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'messages',
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    //O usuário entra em uma sala criada com seu proprio id
    client.join(userId)
    console.log('usuário entrou na sala')
  }
  
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const result = await this.messagesService.create(createMessageDto);
    
    if (result.status === 201) {
      //Envia a mensagem para a sala cujo o nome é o id do usuário que irá receber a mensagem
      this.server.to(createMessageDto.receiver).emit('receiveMessage', result)
    }

    return result
  }

  @SubscribeMessage('findAllMessages')
  async findAll(@MessageBody() userId: string) {
    const result = await this.messagesService.findAll(userId);
    return result
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}

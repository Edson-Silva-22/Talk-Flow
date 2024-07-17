import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { messageSchema } from 'src/schemas/messages';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'messages', schema: messageSchema}
    ])
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}

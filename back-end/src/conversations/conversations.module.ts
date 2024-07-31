import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsGateway } from './conversations.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { conversationSchema } from 'src/schemas/conversations';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'conversations', schema: conversationSchema}
    ])
  ],
  providers: [ConversationsGateway, ConversationsService],
})
export class ConversationsModule {}

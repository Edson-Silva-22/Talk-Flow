import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Message from 'src/schemas/messages';

@Injectable()
export class MessagesService {

  constructor(
    @InjectModel('messages')  private messageModel: Model<typeof Message>
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      const createMessage = await this.messageModel.create(createMessageDto);
      createMessage.save()

      return {
        result: createMessage,
        status: 201,
      }
      
    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar criar a mensagem.',
        status: 500,
      }
    }
  }

  async findAll(userId: string) {
    try {
      const findAllMessages = await this.messageModel
      .find()
      .or([{ sender: userId}, { receiver: userId }])
      .populate('sender')
      .populate('receiver')
      .exec()

      return {
        result: findAllMessages,
        status: 200,
      }

    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar listar as mensagens.',
        status: 500,
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

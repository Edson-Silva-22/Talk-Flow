import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/schemas/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private userModel: Model<typeof User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.userModel.find({email: createUserDto.email});
      const findUserNickname = await this.userModel.find({nickname: createUserDto.nickname});

      if (findUser.length > 0) {
        return {
          message: 'Este email já foi cadastrado',
          status: 400,
        }
      }

      if (findUserNickname.length > 0) {
        return {
          message: 'Este apelido já foi cadastrado',
          status: 400,
        }
      }

      const createUser = await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        nickname: createUserDto.nickname,
      })
      const result = await createUser.save()

      return {
        result,
        status: 201,
      }

    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar cadastrar o usuário',
        status: 500,
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

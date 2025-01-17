import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from 'src/schemas/user';
import * as bcrypt from 'bcrypt'

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

      const hashingPassword = await bcrypt.hash(createUserDto.password, 10)

      const createUser = await this.userModel.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashingPassword,
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

  async findAll() {
    try {
      const findUser = await this.userModel.find()
      return {
        result: findUser,
        status: 200,
      }

    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar listar os usuários',
        status: 500,
      }
    }
  }

  async findOne(id: string) {
    try {
      const findUser = await this.userModel.find({_id: id})

      if (findUser.length === 0) {
        return {
          message: 'Usuário não encontrado',
          status: 400,
        }
      }

      return {
        result: findUser,
        status: 200,
      }

    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar encontrar o usuário',
        status: 500,
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const findUser = await this.userModel.find({_id: id})

      if (findUser.length === 0) {
        return {
          message: 'Usuário não encontrado',
          status: 400,
        }
      }

      await this.userModel.updateOne({_id: id}, updateUserDto)
      
      return {
        message: 'Dados atualizados com sucesso.',
        status: 200,
      }
      
    } catch (error) {
      console.error(error)
      return {
        message: 'Ocorreu um erro ao tentar atualizar os dados do usuário',
        status: 500,
      }
    }
  }

  async remove(id: string) {
    try {
      const findUser = await this.userModel.find({_id: id})

      if (findUser.length === 0) {
        return {
          message: 'Usuário não encontrado',
          status: 400,
        }
      }

      await this.userModel.deleteOne({_id: id})
      return{
        message: 'Usuário excluído com sucesso.',
        status: 200,
      }

    } catch (error) {
      console.log(error)
      return{
        message: 'Ocorreu um erro ao tentar excluir o usuário',
        status: 500,
      }
    }
  }
}

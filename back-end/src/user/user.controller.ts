import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const result = await this.userService.create(createUserDto);
    return response.status(result.status).json(result);
  }

  @Get()
  async findAll(@Res() response: Response) {
    const result = await this.userService.findAll();
    return response.status(result.status).json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.userService.findOne(id);
    return response.status(result.status).json(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response
  ) {
    const result = await this.userService.update(id, updateUserDto)
    return response.status(result.status).json(result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.userService.remove(id);
    return response.status(result.status).json(result);
  }
}

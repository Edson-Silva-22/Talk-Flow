import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/schemas/user';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "myappchat",
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      {name: 'users', schema: userSchema}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

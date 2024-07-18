import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "O nome deve ser informado."})
    @IsString({message: "O nome deve ser uma string."})
    name: string;

    @IsNotEmpty({message: "O email deve ser informado."})
    @IsString({message: "O email deve ser uma string."})
    email: string;

    @IsNotEmpty({message: "A senha deve ser informada."})
    @IsString({message: "A senha deve ser uma string."})
    password: string;

    @IsNotEmpty({message: "O apelido deve ser informado."})
    @IsString({message: "O apelido deve ser uma string."})
    nickname: string;
}

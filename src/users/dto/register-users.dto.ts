import { IsNotEmpty,IsString,IsEmail,MinLength } from "class-validator";

export class RegisterUsersDto {
    @IsNotEmpty()
    @IsString()
    readonly username : string;

    @IsNotEmpty()
    @IsEmail()
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password : string;
}

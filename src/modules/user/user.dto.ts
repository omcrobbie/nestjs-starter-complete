import { IsString, IsDefined, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsDefined()
    readonly name: string;

    @IsString()
    readonly password: string;
}
export class LoginUserDto {
    @IsDefined()
    readonly name: string;

    @IsDefined()
    readonly password: string;
}
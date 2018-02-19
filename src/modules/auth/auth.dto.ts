import { IsString, IsDefined } from "class-validator";

export class LoginDto {
    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    @IsDefined()
    password: string;
}
import { IsString, IsDefined } from "class-validator";

export class CreateGhostDto {
    @IsString()
    @IsDefined()
    readonly name: string;

    @IsString()
    @IsDefined()
    readonly password: string;
}
export class ExchangeGhostDto {
    @IsString()
    @IsDefined()
    readonly token: string;
}
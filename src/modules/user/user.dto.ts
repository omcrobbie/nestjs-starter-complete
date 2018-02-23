import { IsString, IsDefined, IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {
    
    @ApiModelProperty()
    @IsString()
    @IsDefined()
    readonly name: string;
    
    @ApiModelProperty()
    @IsString()
    readonly password: string;
}
export class LoginUserDto {
    
    @ApiModelProperty()
    @IsDefined()
    readonly name: string;

    @ApiModelProperty()
    @IsDefined()
    readonly password: string;
}
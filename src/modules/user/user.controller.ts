import { Controller, Get, Post, Body, Param, HttpException, HttpCode, HttpStatus, Put, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {

    }
    @Get()
    getAll() {
        return this.userService.findAll(); 
    }
    @Get(':id')
    async getOne(@Param('id') id:string) {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new HttpException('user was not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }
    @Post()
    create(@Body() createUser: CreateUserDto) {
        return this.userService.create(createUser);
    }
    @Put(':id')
    update(
        @Body() updateUser: CreateUserDto,
        @Param('id') id:string
    ) {
        return this.userService.update(id, updateUser);
    }

}
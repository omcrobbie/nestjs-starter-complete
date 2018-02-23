import { Controller, Get, Post, Body, Param, HttpException, HttpCode, HttpStatus, Put, ValidationPipe, Req, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto } from "./user.dto";
import { IRequest } from "../../common/interfaces";
import * as jwt from 'jsonwebtoken';
import { ApiImplicitBody } from "@nestjs/swagger";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    @Get()
    getAll() {
        return this.userService.findAll(); 
    }
    @Get(':id')
    async getOne(@Param('id') id:string) {
        const user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
    @Post()
    async create(@Req() request:IRequest)  {
        const user:any = jwt.decode(request.headers['authorization']);
        return this.userService.create(user);
    }
    @Put(':id')
    update(
        @Body() updateUser: CreateUserDto,
        @Param('id') id:string
    ) {
        return this.userService.update(id, updateUser);
    }

}
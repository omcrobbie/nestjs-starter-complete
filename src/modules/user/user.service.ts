import { Component, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { userProviderToken } from "../../common/constants";
import User from "./user.entity";

@Component()
export class UserService {
    constructor(
        @Inject(userProviderToken) 
        private readonly user: typeof User
    ){}
    findAll() {
        return this.user.findAll();
    }
    findOne(id) {
        return this.user.findById(id);
    }
    async create(user:any) {
        return this.user.create(user);
    }
    async update(id: string, user: any) {
        const updateUser = await this.user.findById(id);
        return updateUser.update(user);
    }
}
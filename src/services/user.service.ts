import { Component, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { userProviderToken } from "../common/constants";
import UserModel from "../entity/user/user.entity";

@Component()
export class UserService {
    constructor(
        @Inject(userProviderToken) 
        private readonly User: typeof UserModel
    ){}
    findAll() {
        return this.User.findAll();
    }
    findOne(id) {
        return this.User.findById(id);
    }
    async create(user:any) {
        return this.User.create(user);
    }
    async update(id: string, user: any) {
        const updateUser = await this.User.findById(id);
        return updateUser.update(user);
    }
}
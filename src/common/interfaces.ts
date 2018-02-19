import { Request } from "@nestjs/common";
import UserModel from "../modules/user/user.entity";


export interface IRequest extends Request {
    userId: number;
}
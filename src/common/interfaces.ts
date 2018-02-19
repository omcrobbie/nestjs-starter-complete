import { Request } from "@nestjs/common";
import User from "../modules/user/user.entity";


export interface IRequest extends Request {
    user: User;
}
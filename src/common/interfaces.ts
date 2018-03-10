import { Request } from "@nestjs/common";


export interface IRequest extends Request {
    userId: number;
}
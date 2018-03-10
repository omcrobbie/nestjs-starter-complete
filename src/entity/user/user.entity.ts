import * as bcrypt from 'bcrypt';
import { Model, Table, Column, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
@Table
export default class UserModel extends Model<UserModel> {

    @Column
    name: string;

    @Column
    password: string;

    @BeforeUpdate
    @BeforeCreate
    static hashPassword(instance: UserModel) {
        instance.password = bcrypt.hashSync(instance.password, bcrypt.genSaltSync(10));
        
    }
    checkPw(pw: string) {
        return bcrypt.compareSync(pw, this.password);
    }
}
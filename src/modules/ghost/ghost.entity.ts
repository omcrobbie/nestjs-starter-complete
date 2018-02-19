import { Table, Model, Column } from "sequelize-typescript";

@Table
export default class GhostModel extends Model<GhostModel> {
    @Column
    token: string;
}
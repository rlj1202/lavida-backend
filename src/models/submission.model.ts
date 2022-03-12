import { Table, Column, Model, AllowNull, PrimaryKey } from 'sequelize-typescript'

@Table
class Submission extends Model {
    @PrimaryKey
    @Column
    submission_id!: number
}

export default Submission

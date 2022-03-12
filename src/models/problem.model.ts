import {
    Table, Column, Model,
    AllowNull, PrimaryKey, AutoIncrement
} from 'sequelize-typescript'

@Table({
    tableName: 'problems',
    createdAt: false,
    updatedAt: false,
})
class Problem extends Model<Problem> {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    problem_id!: number

    @AllowNull(false)
    @Column
    title!: string

    @Column
    description!: string

    @Column
    input!: string

    @Column
    output!: string

    @AllowNull(false)
    @Column
    time_limit!: number

    @AllowNull(false)
    @Column
    memory_limit!: number
}

export default Problem

import {
    Model, Table, Column,
    Unique, PrimaryKey,
    AllowNull, AutoIncrement, HasMany,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript'

import Comment from './comment.model'

@Table
class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column
    readonly id!: number

    @Unique
    @AllowNull(false)
    @Column
    authId!: string

    @Unique
    @AllowNull(false)
    @Column
    email!: string

    @AllowNull(false)
    @Column
    passwordHash!: string

    @AllowNull(false)
    @Column
    name!: string

    @AllowNull(false)
    @Column
    nickname!: string

    @HasMany(() => Comment)
    comments?: Comment[]

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date
}

export default User

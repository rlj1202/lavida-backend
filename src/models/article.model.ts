import {
    Model, Table, Column,
    PrimaryKey, AllowNull, AutoIncrement, HasMany,
    ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DataType
} from 'sequelize-typescript'

import User from './user.model'
import Comment from './comment.model'
import Board from './board.model'

@Table
class Article extends Model<Article> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @AllowNull(false)
    @Column
    title!: string

    @ForeignKey(() => User)
    @Column
    authorId!: number

    @BelongsTo(() => User)
    author!: User

    @ForeignKey(() => Board)
    @Column
    boardId!: number

    @BelongsTo(() => Board)
    board!: Board

    @Column(DataType.TEXT)
    content!: string

    @HasMany(() => Comment)
    comments!: Comment[]

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date

}

export default Article

import {
    Model, Table, Column,
    PrimaryKey, AllowNull, AutoIncrement,
    ForeignKey, BelongsTo, CreatedAt, UpdatedAt
} from 'sequelize-typescript'

import Article from './article.model';
import User from './user.model';

@Table
class Comment extends Model<Comment> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @AllowNull(false)
    @Column
    content!: string

    @ForeignKey(() => User)
    @Column
    authorId!: number

    @BelongsTo(() => User, 'authorId')
    author!: User

    @ForeignKey(() => Article)
    @Column
    postId!: number

    @BelongsTo(() => Article, 'articleId')
    article!: Article

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}

export default Comment

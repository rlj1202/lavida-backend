import {
    Model, Table, Column,
    PrimaryKey, AllowNull, AutoIncrement, Unique,
    HasMany
} from 'sequelize-typescript'

import Article from './article.model'

@Table
class Board extends Model<Board> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @Unique
    @Column
    name!: string

    @AllowNull(false)
    @Column
    title!: string

    @Column
    description!: string

    @HasMany(() => Article)
    articles!: Article[]
}

export default Board

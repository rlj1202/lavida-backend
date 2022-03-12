import dotenv from 'dotenv'
import path from 'path'

const isDev = process.env.NODE_ENV !== 'production'

if (isDev) {
    dotenv.config({
        path: path.join(__dirname, '../.env.local')
    })
} else {
    dotenv.config()
}

const Config = {
    port: 3000,

    db: {
        host: process.env.DB_HOST ?? 'localhost',
        port: process.env.DB_PORT ?? 3306,
        name: process.env.DB_NAME ?? '',
        username: process.env.DB_USERNAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
    },
}

export default Config

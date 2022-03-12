import Koa from 'koa'
import Router from 'koa-router'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import { Sequelize } from 'sequelize-typescript'

import apiRouter from './api'

import Config from './config'

const isDev = process.env.NODE_ENV !== 'production'

async function main() {
    // Setup DB
    const sequelize = new Sequelize(
        Config.db.name,
        Config.db.username,
        Config.db.password,
        {
            host: Config.db.host,
            dialect: 'mysql',
            logging: isDev ? console.log : false,
        }
    )

    await sequelize.authenticate()

    sequelize.addModels([__dirname + '/models/**/*.model.ts'])

    // Setup koa
    const app = new Koa()
    const router = new Router()

    router.use('/api', apiRouter.routes())

    app.use(bodyParser())
    app.use(logger())

    app.use(router.routes())
    app.use(router.allowedMethods())

    app.listen(Config.port, () => {
        console.log(`> Listening to port ${Config.port}`)
    })
}

main()

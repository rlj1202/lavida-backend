import Router from 'koa-router'

const router = new Router()

router.post('/', (ctx, next) => {
    ctx.body = `${ctx.url}`
})
router.get('/:id', async (ctx, next) => {
})

export default router

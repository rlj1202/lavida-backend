import Router from 'koa-router'

import Problem from '../../models/problem.model'

const router = new Router()

router.get('/:id', async (ctx, next) => {
    const { id } = ctx.params

    const result = await Problem.findOne({
        where: {
            problem_id: id,
        }
    })

    ctx.body = result
})

export default router

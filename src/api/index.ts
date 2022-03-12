import Router from 'koa-router'

import problemsRouter from './problems'
import submissionsRouter from './submissions'

const router = new Router()

router.use('/problems', problemsRouter.routes())
router.use('/submissions/', submissionsRouter.routes())

router.post('/articles/')
router.get('/articles/:id')
router.post('/articles/:id/comments/')
router.get('/articles/:id/comments/:id')
router.delete('/articles/:id/comments/:id')

router.post('/boards/')
router.get('/boards/:id')
router.post('/boards/:id/articles')
router.get('/boards/:id/articles/:id')

router.post('/users/')
router.get('/users/:id')
router.put('/users/:id')

export default router

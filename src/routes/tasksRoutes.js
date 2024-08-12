import {Router} from 'express'
import {getList, create, update, deleted} from '../controllers/TasksControllers.js'
const taskRouter = Router()

taskRouter.get('/task', getList)
taskRouter.post('/task/:user_id', create)
taskRouter.put('/task/:id', update)
taskRouter.delete('/task/:id', deleted)

export default taskRouter;
import express from 'express'
import taskRouter from './routes/tasksRoutes.js'
import userRouter from './routes/usersRoutes.js'
import { openDB } from './database/configDB.js'
import authRoutes from './routes/authRoutes.js'
import authMidleware from './middlewares/authMidlewares.js'

const app = express()

await openDB()
app.use(express.json())
app.use('/api', authRoutes);
app.use('/api', authMidleware)
app.use('/api', taskRouter, userRouter)

const port = process.env.PORT || 4002

app.listen(port, ()=> console.log('This server on running port ', port))
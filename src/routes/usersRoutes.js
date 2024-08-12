import { Router } from "express";
import authMidleware from "../middlewares/authMidlewares.js";
const userRouter = Router()
import { deleteUser, update, getAll } from "../controllers/UserController.js";


userRouter.delete('/user/:userId',authMidleware, deleteUser)
userRouter.put('/user/:userId',authMidleware, update)
userRouter.get('/user',authMidleware, getAll)

export default userRouter
import { Router } from "express";
import {login} from '../controllers/AuthController.js'
import { create } from "../controllers/UserController.js";



const authRouter = Router()

authRouter.post('/auth', login)
authRouter.post('/user', create)

export default authRouter

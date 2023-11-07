import { Router } from "express";
import * as UserController from '../controller/UserController'
import * as EmailController from '../controller/EmailController'
import { Auth } from "../middlewares/Auth";
import { privateRoute } from '../config/passport'

export const router = Router()

// router.get('/ping', EmailController.ping)
router.get('/todo', privateRoute,UserController.all)
router.post('/novo-usuario', UserController.addUser)
router.post('/login', UserController.login)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.removeUser)
router.post('/contato', EmailController.sendEmail)

export default router
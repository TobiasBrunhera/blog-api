import { Router } from "express";
import * as UserController from '../controller/UserController'
export const router = Router()
import { Auth } from "../middlewares/Auth";

router.get('/todo', Auth.private,UserController.all)
router.post('/novo-usuario', UserController.addUser)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.removeUser)

export default router
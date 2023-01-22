import { Router } from "express"
import { createUserController } from "../controllers/users.controllers"
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware"

const usersRoutes = Router()

usersRoutes.post("", ensureUserExistsMiddleware, createUserController)

export default usersRoutes
import { Router } from "express"
import { createUserController, sessionController } from "../controllers/users.controllers"
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware"

const usersRoutes = Router()

usersRoutes.post("", ensureUserExistsMiddleware, createUserController)
usersRoutes.post("/session", ensureUserExistsMiddleware, sessionController)

export default usersRoutes
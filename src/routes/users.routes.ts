import { Router } from "express"
import { createUserController, deleteUserController, getUserProfileController, sessionController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware"
import ensureUserIsResourceOwnerMiddleware from "../middlewares/ensureUserIsResourceOwner.middleware"

const usersRoutes = Router()

usersRoutes.post("", ensureUserExistsMiddleware, createUserController)
usersRoutes.post("/session", ensureUserExistsMiddleware, sessionController)
usersRoutes.get("/:id", ensureAuthMiddleware, ensureUserIsResourceOwnerMiddleware, getUserProfileController)
usersRoutes.delete("/:id", ensureAuthMiddleware, ensureUserIsResourceOwnerMiddleware, deleteUserController)

export default usersRoutes
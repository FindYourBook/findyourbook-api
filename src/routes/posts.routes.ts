import { Router } from "express"
import { createPostsController } from "../controllers/posts.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const postsRoutes = Router()

postsRoutes.post("", ensureAuthMiddleware, createPostsController)

export default postsRoutes
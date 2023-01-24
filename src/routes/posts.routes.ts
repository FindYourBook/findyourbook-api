import { Router } from "express"
import { createPostsController, getAllPostsController } from "../controllers/posts.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"

const postsRoutes = Router()

postsRoutes.post("", ensureAuthMiddleware, createPostsController)
postsRoutes.get("", ensureAuthMiddleware, getAllPostsController)

export default postsRoutes
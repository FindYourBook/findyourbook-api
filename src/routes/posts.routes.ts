import { Router } from "express"
import { createPostsController, updatePostsController } from "../controllers/posts.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureUserIsPostOwnerMiddleware from "../middlewares/ensureUserIsPostOwner.middleware"

const postsRoutes = Router()

postsRoutes.post("", ensureAuthMiddleware, createPostsController)
postsRoutes.patch("/:id", ensureAuthMiddleware, ensureUserIsPostOwnerMiddleware, updatePostsController)

export default postsRoutes
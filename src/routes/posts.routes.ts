import { Router } from "express"
import { createPostsController, updatePostsController, getAllPostsController, deletePostsController } from "../controllers/posts.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureUserIsPostOwnerMiddleware from "../middlewares/ensureUserIsPostOwner.middleware"

const postsRoutes = Router()

postsRoutes.post("", ensureAuthMiddleware, createPostsController)
postsRoutes.patch("/:id", ensureAuthMiddleware, ensureUserIsPostOwnerMiddleware, updatePostsController)
postsRoutes.get("", ensureAuthMiddleware, getAllPostsController)
postsRoutes.delete("/:id", ensureAuthMiddleware, ensureUserIsPostOwnerMiddleware, deletePostsController)

export default postsRoutes
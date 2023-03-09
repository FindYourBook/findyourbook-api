import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source"
import Posts from "../entities/posts.entitites"
import AppError from "../errors/AppError"

const ensureUserIsPostOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id
    const userIdFromToken = res.locals.userTokenData.id

    const postsRepository = AppDataSource.getRepository(Posts)
    const foundPost = await postsRepository.findOne({
        where: { id: postId },
        relations: ["user", "user.posts"],
        withDeleted: true
    })

    if (!foundPost) {
        throw new AppError("Post not found", 404)
    }

    if (userIdFromToken != foundPost.user.id) {
        throw new AppError("You do not have access to this information.", 403)
    }

    res.locals.foundPost = foundPost
    return next()
}

export default ensureUserIsPostOwnerMiddleware
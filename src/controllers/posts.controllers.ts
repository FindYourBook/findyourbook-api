import { Request, Response } from "express"
import { IPostRequest } from "../interfaces/posts.interfaces"
import createPostsService from "../services/posts/createPostsService.services"

const createPostsController = async (req: Request, res: Response) => {
    const userId: string = res.locals.userTokenData.id
    const postData: IPostRequest = req.body

    const createdPost = await createPostsService(userId, postData)
    return res.status(201).json(createdPost)
}

export {
    createPostsController
}
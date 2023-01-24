import { Request, Response } from "express"
import { IPostRequest } from "../interfaces/posts.interfaces"
import createPostsService from "../services/posts/createPostsService.services"
import getAllPostsService from "../services/posts/getAllPostsService.services"

const createPostsController = async (req: Request, res: Response) => {
    const userId: string = res.locals.userTokenData.id
    const postData: IPostRequest = req.body

    const createdPost = await createPostsService(userId, postData)
    return res.status(201).json(createdPost)
}

const getAllPostsController = async (req: Request, res: Response) => {
    const allPosts = await getAllPostsService()
    return res.status(200).json(allPosts)
}

export {
    createPostsController,
    getAllPostsController
}
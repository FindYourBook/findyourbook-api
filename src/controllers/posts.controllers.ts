import { Request, Response } from "express"
import { IPostRequest } from "../interfaces/posts.interfaces"
import createPostsService from "../services/posts/createPostsService.services"
import updatePostsService from "../services/posts/updatePostsService.services"
import getAllPostsService from "../services/posts/getAllPostsService.services"
import deletePostsService from "../services/posts/deletePostsService.services"
import deleteOlderPostsService from "../services/posts/deleteOlderPostsService.services"

const createPostsController = async (req: Request, res: Response) => {
    const userId: string = res.locals.userTokenData.id
    const postData: IPostRequest = req.body

    const createdPost = await createPostsService(userId, postData)
    return res.status(201).json(createdPost)
}

const updatePostsController = async (req: Request, res: Response) => {
    const postData: IPostRequest = req.body
    const foundPost = res.locals.foundPost

    const updatedPost = await updatePostsService(postData, foundPost)
    return res.status(200).json(updatedPost)
}

const getAllPostsController = async (req: Request, res: Response) => {
    const allPosts = await getAllPostsService()
    return res.status(200).json(allPosts)
}

const deletePostsController = async (req: Request, res: Response) => {
    const postId = req.params.id
    
    await deletePostsService(postId)
    return res.status(204).send()
}

const deleteOlderPostsController = async (req: Request, res: Response) => {
    await deleteOlderPostsService()
    return res.status(204).send()
}

export {
    createPostsController,
    updatePostsController,
    getAllPostsController,
    deletePostsController,
    deleteOlderPostsController
}
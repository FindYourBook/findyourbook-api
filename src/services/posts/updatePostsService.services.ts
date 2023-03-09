import { IPostRequest } from "../../interfaces/posts.interfaces"
import { postsSerializer } from "../../serializers/posts.serializers"
import AppDataSource from "../../data-source"
import Posts from "../../entities/posts.entitites"
import AppError from "../../errors/AppError"

const updatePostsService = async (postData: IPostRequest, foundPost: IPostRequest): Promise<Posts> => {
    try {
        const postDataValidated = await postsSerializer.validate(postData, {
            stripUnknown: true,
            abortEarly: false
        })
        
        const postsRepository = AppDataSource.getRepository(Posts)

        const updatedPost = postsRepository.create({
            ...foundPost,
            ...postDataValidated
        })
        await postsRepository.save(updatedPost)

        delete updatedPost.user
        return updatedPost
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default updatePostsService
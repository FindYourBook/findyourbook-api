import AppDataSource from "../../data-source"
import Posts from "../../entities/posts.entitites"
import Users from "../../entities/users.entities"
import AppError from "../../errors/AppError"
import { IPostRequest } from "../../interfaces/posts.interfaces"
import { postsSerializer } from "../../serializers/posts.serializers"

const createPostsService = async (userId: string, postData: IPostRequest): Promise<Posts> => {
    try {
        const postDataValidated = await postsSerializer.validate(postData, {
            stripUnknown: true,
            abortEarly: false
        })

        const postsRepository = AppDataSource.getRepository(Posts)
        const usersRepository = AppDataSource.getRepository(Users)

        const foundUser = await usersRepository.findOneBy({ id: userId })

        if (!foundUser) {
            throw new AppError("User invalid.", 400)
        }

        const createdPost = postsRepository.create({
            description: postDataValidated.description,
            location: postDataValidated.location,
            book: postDataValidated.book,
            picture: postDataValidated.picture,
            subway: postDataValidated.subway,
            user: foundUser
        })
        await postsRepository.save(createdPost)

        return createdPost
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default createPostsService
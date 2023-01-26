import AppDataSoruce from "../../data-source"
import Posts from "../../entities/posts.entitites"

const getAllPostsService = async (): Promise<Posts[]> => {
    const postsRepository = AppDataSoruce.getRepository(Posts)

    const allPosts = await postsRepository.find()
    return allPosts
}

export default getAllPostsService
import AppDataSource from "../../data-source"
import Posts from "../../entities/posts.entitites"

const deletePostsService = async (postId: string): Promise<void> => {
    await AppDataSource.createQueryBuilder()
    .delete()
    .from(Posts, "posts")
    .where("id = :postId", { postId: postId })
    .execute()
}

export default deletePostsService
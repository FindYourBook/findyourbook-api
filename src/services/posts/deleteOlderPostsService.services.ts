import AppDataSource from "../../data-source"
import Posts from "../../entities/posts.entitites"

const deleteOlderPostsService = async () => {
    const checkData = new Date()
    const currentDate = checkData.toISOString().slice(0, 10)

    await AppDataSource.createQueryBuilder()
    .delete()
    .from(Posts, "posts")
    .where("createdOn < :currentDate", { currentDate: currentDate })
    .execute()
}

export default deleteOlderPostsService
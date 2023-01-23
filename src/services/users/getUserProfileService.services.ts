import Users from "../../entities/users.entities"
import AppDataSource from "../../data-source"
import AppError from "../../errors/AppError"

const getUserProfileService = async (id: string): Promise<Users> => {
    const usersRepository = AppDataSource.getRepository(Users)

    const foundUser = await usersRepository.findOne({
        where: { id: id },
        relations: ["posts", "posts.user"],
        withDeleted: true
    })

    if (!foundUser) {
        throw new AppError("User not found.", 404)
    }

    return foundUser
}

export default getUserProfileService
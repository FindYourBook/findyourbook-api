import AppDataSource from "../../data-source"
import Users from "../../entities/users.entities"
import AppError from "../../errors/AppError"

const deleteUserService = async (userId: string): Promise<void> => {
    const usersRepository = AppDataSource.getRepository(Users)

    const foundUser = await usersRepository.findOneBy({ id: userId })

    if (!foundUser) {
        throw new AppError("User not found.", 404)
    } 

    if (!foundUser.isActive) {
        throw new AppError("This user is already deactivated", 400)
    }

    await usersRepository.softDelete(foundUser.id)
    await usersRepository.save({...foundUser, isActive: false})
}

export default deleteUserService
import { IUserRequest } from "../../interfaces/users.interfaces"
import { createUserSerializer } from "../../serializers/users.serializers"
import AppDataSource from "../../data-source"
import Users from "../../entities/users.entities"
import AppError from "../../errors/AppError"

const createUserService = async (userData: IUserRequest): Promise<Users> => {
    try {
        const userDataValidated = await createUserSerializer.validate(userData, {
            stripUnknown: true,
            abortEarly: false
        })

        const usersRepository = AppDataSource.getRepository(Users) 
        const createdUser = usersRepository.create(userDataValidated)
        await usersRepository.save(createdUser)

        delete createdUser.password
        return createdUser
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default createUserService
import { Request, Response, NextFunction } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import AppDataSource from "../data-source"
import Users from "../entities/users.entities"
import AppError from "../errors/AppError"

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUserRequest = req.body
    const usersRepository = AppDataSource.getRepository(Users)

    const user = await usersRepository.findOneBy({
        email: userData.email
    })

    if (user) {
        throw new AppError("User already exists.", 409)
    }   
    return next()
}

export default ensureUserExistsMiddleware
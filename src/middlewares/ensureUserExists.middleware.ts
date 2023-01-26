import { Request, Response, NextFunction } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import AppDataSource from "../data-source"
import Users from "../entities/users.entities"
import AppError from "../errors/AppError"

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUserRequest = req.body

    const user = await AppDataSource.createQueryBuilder()
    .where("users.email = :userEmail", { userEmail: userData.email })
    .select()
    .from(Users, "users").getRawOne()

    res.locals.user = user

    if (!userData.name && user) {
        return next()
    } else if (userData.name && user) {
        throw new AppError("User already exists.", 409)
    }
    return next()
}

export default ensureUserExistsMiddleware
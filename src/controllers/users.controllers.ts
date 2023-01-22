import { Request, Response, NextFunction } from "express"
import { IUserRequest } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUserService.services"

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUserRequest = req.body

    const createdUser = await createUserService(userData)
    return res.status(201).json(createdUser)
}

export { 
    createUserController
}
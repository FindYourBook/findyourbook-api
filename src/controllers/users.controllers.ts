import { Request, Response, NextFunction } from "express"
import { ISessionRequest, IUserRequest } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUserService.services"
import sessionService from "../services/users/sessionService.services"

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUserRequest = req.body

    const createdUser = await createUserService(userData)
    return res.status(201).json(createdUser)
}

const sessionController = async (req: Request, res: Response, next: NextFunction) => {
    const userData: ISessionRequest = req.body
    const foundUser = res.locals.user

    const token = await sessionService(userData, foundUser)
    return res.status(200).json(token)
}

export { 
    createUserController,
    sessionController
}
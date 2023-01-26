import { Request, Response } from "express"
import { ISessionRequest, IUserRequest } from "../interfaces/users.interfaces"
import createUserService from "../services/users/createUserService.services"
import deleteUserService from "../services/users/deleteUserService.services"
import getUserProfileService from "../services/users/getUserProfileService.services"
import sessionService from "../services/users/sessionService.services"

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body

    const createdUser = await createUserService(userData)
    return res.status(201).json(createdUser)
}

const sessionController = async (req: Request, res: Response) => {
    const userData: ISessionRequest = req.body
    const foundUser = res.locals.user

    const token = await sessionService(userData, foundUser)
    return res.status(200).json(token)
}

const getUserProfileController = async (req: Request, res: Response) => {
    const idFromRoute = req.params.id

    const foundUser = await getUserProfileService(idFromRoute)
    return res.status(200).json(foundUser)
}

const deleteUserController = async (req: Request, res: Response) => {
    const userId = req.params.id

    await deleteUserService(userId)
    return res.status(204).send()
}

export { 
    createUserController,
    sessionController,
    getUserProfileController,
    deleteUserController
}
import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError"

const ensureUserIsAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isAdm = res.locals.userTokenData.isAdm

    if (!isAdm) {
        throw new AppError("You do not have access to this information.", 403)
    }
    return next()
}

export default ensureUserIsAdmMiddleware
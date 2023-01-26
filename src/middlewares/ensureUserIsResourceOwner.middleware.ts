import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError"

const ensureUserIsResourceOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const idFromToken = res.locals.userTokenData.id
    const idFromRoute = req.params.id

    if (idFromRoute === idFromToken) {
        return next()
    }
    throw new AppError("You do not have access to this information.", 403)
}

export default ensureUserIsResourceOwnerMiddleware
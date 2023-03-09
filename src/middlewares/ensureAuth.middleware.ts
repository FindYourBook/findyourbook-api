import { Request, Response, NextFunction } from "express"
import { IToken } from "../interfaces/users.interfaces"
import AppError from "../errors/AppError"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers.authorization
   
    if (!token) {
        throw new AppError("Invalid token.", 400)
   
    }
    
    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded: IToken) => {
        if (error) {
            throw new AppError(error.message, 400)
        }

        res.locals.userTokenData = {
            id: decoded.id,
            isAdm: decoded.isAdm
        }

        return next()
    })
}

export default ensureAuthMiddleware
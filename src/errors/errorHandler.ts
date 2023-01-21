import { Request, Response, NextFunction, response } from "express"
import AppError from "./AppError"

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    return response.status(500).json({ message: "Internal server error" })
}

export default errorHandler
import { ISessionRequest } from "../../interfaces/users.interfaces"
import { sessionSerializer } from "../../serializers/users.serializers"
import { compare } from "bcryptjs"
import Users from "../../entities/users.entities"
import AppError from "../../errors/AppError"
import jwt from "jsonwebtoken"

const sessionService = async (userData: ISessionRequest, userFromDatabase: Users) => {
    try {
        const userDataValidated = await sessionSerializer.validate(userData, {
            stripUnknown: true,
            abortEarly: false
        })

        const comparedPassword = await compare(userDataValidated.password, userFromDatabase.password)
       
        if (!comparedPassword) {
            throw new AppError("Invalid user.", 400)
        }

        const token = jwt.sign(
            {
                isAdm: userFromDatabase.isAdm,
                id: userFromDatabase.id
            },
            process.env.SECRET_KEY,
            {
                subject: userFromDatabase.id,
                expiresIn: "24h"
            }
        )

        return { token: token }
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export default sessionService
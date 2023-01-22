import * as yup from "yup"
import { SchemaOf } from "yup"
import { IUserRequest } from "../interfaces/users.interfaces"

const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8, "Must be at least 8 digits").required(),
    name: yup.string().required(),
    isAdm: yup.boolean().required()
})

export {
    createUserSerializer
}
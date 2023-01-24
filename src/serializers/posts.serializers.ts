import * as yup from "yup"
import { SchemaOf } from "yup"
import { IPostRequest } from "../interfaces/posts.interfaces"

const createPostsSerializer: SchemaOf<IPostRequest> = yup.object().shape({
    description: yup.string().required(),
    book: yup.string().required(),
    subway: yup.string().required(),
    location: yup.string().required(),
    picture: yup.string().required()
})

export {
    createPostsSerializer
}
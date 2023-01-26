import * as yup from "yup"
import { SchemaOf } from "yup"
import { IPostRequest } from "../interfaces/posts.interfaces"

const postsSerializer: SchemaOf<IPostRequest> = yup.object().shape({
    description: yup.string(),
    book: yup.string(),
    subway: yup.string(),
    location: yup.string(),
    picture: yup.string()
})

export {
    postsSerializer
}
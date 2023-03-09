import "reflect-metadata"
import "express-async-errors"
import express from "express"
import errorHandler from "./errors/errorHandler"
import usersRoutes from "./routes/users.routes"
import postsRoutes from "./routes/posts.routes"

const app = express()
app.use(express.json())
app.use(errorHandler)

app.use("/users", usersRoutes)
app.use("/posts", postsRoutes)

export default app
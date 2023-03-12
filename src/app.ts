import "reflect-metadata"
import "express-async-errors"
import express from "express"
import errorHandler from "./errors/errorHandler"
import usersRoutes from "./routes/users.routes"
import postsRoutes from "./routes/posts.routes"
import { Request, Response } from "express"

const app = express()
app.use(express.json())
app.use(errorHandler)

app.use("/users", usersRoutes)
app.use("/posts", postsRoutes)

app.use(express.static("documentation"))
app.use("./", (req: Request, res: Response) => {
    res.render("index.html")
})

export default app
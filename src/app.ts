import "reflect-metadata"
import "express-async-errors"
import express from "express"
import errorHandler from "./errors/errorHandler"
import usersRoutes from "./routes/users.routes"

const app = express()
app.use(express.json())
app.use(errorHandler)

app.use("/users", usersRoutes)

export default app
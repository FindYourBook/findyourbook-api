import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { 
    mockedAdmin, 
    mockedAdminLogin, 
    mockedPost,
    mockedPostUpdate, 
    mockedUser, 
    mockedUserLogin 
} from "../../mocks"

describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /posts - should be able to create post", async () => {
        await request(app).post("/users").send(mockedUser)
        const userLoginResponse = await request(app).post("/users/session").send(mockedUserLogin)
        const response = await request(app).post("/posts").set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedPost)

        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("location")
        expect(response.body).toHaveProperty("book")
        expect(response.body).toHaveProperty("picture")
        expect(response.body).toHaveProperty("subway")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("user")
        expect(response.body).toHaveProperty("deletedAt")
        expect(response.body).toHaveProperty("createdOn")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body.description).toEqual("Evelyn Hugo")
        expect(response.body.location).toEqual("Salvador/BA")
        expect(response.body.book).toEqual("Evelyn Hugo")
        expect(response.body.picture).toEqual("https://m.media-amazon.com/images/I/91KL76cFphL.jpg")
        expect(response.body.subway).toEqual("Brotas")
        expect(response.status).toBe(201)
    })

    test("GET /posts - should be able to list all posts", async () => {
        await request(app).post("/users").send(mockedAdmin)
        const adminLoginResponse = await request(app).post("/users/session").send(mockedAdminLogin)
        const response = await request(app).get("/posts").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
    })

    test("PATCH /posts/:id -  should not be able to update post",async () => {
        const newValues = {book: "Os Sete Maridos de Evelyn Hugo", location: "Salvador/BA"}

        const userLoginResponse = await request(app).post("/users/session").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`
        
        const postTobeUpdateRequest = await request(app).get("/posts").set("Authorization", token)
        const postTobeUpdateId = postTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/posts/${postTobeUpdateId}`).set("Authorization",token).send(newValues)

        const postUpdated = await request(app).get("/posts").set("Authorization", token)

        expect(postUpdated.body[0].book).toEqual("Os Sete Maridos de Evelyn Hugo")
        expect(postUpdated.body[0].location).toEqual("Salvador/BA")
        expect(postUpdated.body[0]).not.toHaveProperty("password")
        expect(response.status).toBe(200)
    })   

    test("DELETE /posts - should be able to delete old posts", async () => {
        const adminLoginResponse = await request(app).post("/users/session").send(mockedAdminLogin)
        const token = `Bearer ${adminLoginResponse.body.token}`

        const response = await request(app).delete("/posts").set("Authorization",token)
        expect(response.status).toBe(204)
    })

    test("DELETE /posts/:id -  should not be able to delete post",async () => {
        const userLoginResponse = await request(app).post("/users/session").send(mockedUserLogin)
        const token = `Bearer ${userLoginResponse.body.token}`
        
        const postTobeDeleteRequest = await request(app).get("/posts").set("Authorization", token)
        const postTobeDeleteId = postTobeDeleteRequest.body[0].id

        const response = await request(app).delete(`/posts/${postTobeDeleteId}`).set("Authorization",token)
        expect(response.status).toBe(204)
    })   
})
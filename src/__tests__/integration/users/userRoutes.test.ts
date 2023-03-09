import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { 
    mockedAdmin,
    mockedAdminLogin, 
    mockedUser, 
    mockedUserLogin, 
    mockedUserToBeDeleted,
    mockedUserToBeDeletedLogin
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

    test("POST /users - should be able to create user", async () => {
        const response = await request(app).post("/users").send(mockedUser)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("deletedAt")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdOn")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("ana")
        expect(response.body.email).toEqual("ana@gmail.com")
        expect(response.body.isAdm).toEqual(false)
        expect(response.status).toBe(201)
    })

    test("POST /users - should not be able to create a user that already exists", async () => {
        try {
            const response = await request(app).post("/users").send(mockedUser)
        } catch (error) {
            expect(error.message).toEqual("User already exists.")
            expect(error.status).toBe(409)
        }
    })

    test("POST /users/session - should be able to login", async () => {
        const response = await request(app).post("/users/session").send(mockedUserLogin)

        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
    })

    test("GET /users/:id - should be able to get user profile", async () => {
        const adminCreated = await request(app).post("/users").send(mockedAdmin)
        const adminLoginResponse = await request(app).post("/users/session").send(mockedAdminLogin)
        const response = await request(app).get(`/users/${adminCreated.body.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`) 

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("deletedAt")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdOn")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("posts")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("findyourbook")
        expect(response.body.email).toEqual("findyourbook@gmail.com")
        expect(response.body.isAdm).toEqual(true)
        expect(response.status).toBe(200)
    })
    
    test("SOFT DELETE /users/:id - should be able to soft delete user", async () => {
        const userCreated = await request(app).post("/users").send(mockedUserToBeDeleted)
        const userLoginResponse = await request(app).post("/users/session").send(mockedUserToBeDeletedLogin);

        const response = await request(app).delete(`/users/${userCreated.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        const findUser = await request(app).get(`/users/${userCreated.body.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`) 
        
        expect(response.status).toBe(204)
        expect(findUser.body.isActive).toBe(false)
    })
})
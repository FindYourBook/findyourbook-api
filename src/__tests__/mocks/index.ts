import { IUserRequest, ISessionRequest } from "../../interfaces/users.interfaces"
import { IPostRequest } from "../../interfaces/posts.interfaces"

export const mockedUser: IUserRequest = {
    "email": "ana@gmail.com",
    "password": "analuiza123",
    "isAdm": false,
    "name": "ana"
}

export const mockedAdmin: IUserRequest = {
    "email": "findyourbook@gmail.com",
	"password": "findyourbook123",
	"isAdm": true,
	"name": "findyourbook"
}

export const mockedUserToBeDeleted: IUserRequest = {
    "email": "john@gmail.com",
	"password": "john1236655",
	"isAdm": false,
	"name": "john"
}

export const mockedUserLogin: ISessionRequest = {
    "email": "ana@gmail.com",
    "password": "analuiza123"
}

export const mockedUserToBeDeletedLogin: ISessionRequest = {
    "email": "john@gmail.com",
	"password": "john1236655"
}

export const mockedAdminLogin: ISessionRequest = {
    "email": "findyourbook@gmail.com",
	"password": "findyourbook123"
}

export const mockedPost: IPostRequest = {
    "description": "Evelyn Hugo",
	"location": "Salvador/BA",
	"book": "Evelyn Hugo",
	"picture": "https://m.media-amazon.com/images/I/91KL76cFphL.jpg",
	"subway": "Brotas"
}

export const mockedPostUpdate: IPostRequest = {
    "book": "Os Sete Maridos de Evelyn Hugo",
    "location": "Salvador/BA"
}
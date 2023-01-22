interface IUserRequest {
    email: string,
    password: string,
    name: string,
    isAdm: boolean
}

interface ISessionRequest {
    email: string,
    password: string
}

export {
    IUserRequest,
    ISessionRequest
}
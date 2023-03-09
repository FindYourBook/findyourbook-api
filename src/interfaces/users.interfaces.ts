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

interface IToken {
    id: string,
    isAdm: boolean
}

export {
    IUserRequest,
    ISessionRequest,
    IToken
}
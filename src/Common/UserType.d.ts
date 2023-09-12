export interface User {
    access_token: string
    _id: string
    name: string
    email: string
    password: string
    rol: string
    createdAt: Date
    updatedAt: Date
}

export interface UserLoged {
    userloged: Usuario
}

export interface NewUser {
    email: string
    name: string
    password: string
}
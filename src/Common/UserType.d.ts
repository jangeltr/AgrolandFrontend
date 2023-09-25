export interface User {
    access_token: string
    _id: string
    email: string
    userName: string
    password: string
    rol: string
    createdAt: Date
    updatedAt: Date
    perfil: object
    permisos: object
}

export interface NewUser {
    App: string
    userName: string
    email: string
    password: string
    rol: string
    perfil: {
        nombre: string
    }
}

export interface UserLogin {
    App: string
    userName: string
    email: string
    password: string
}
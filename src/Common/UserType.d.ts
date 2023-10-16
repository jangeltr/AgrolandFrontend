export interface Usuario {
    _id: string
    email: string
    userName: string
    password: string
    rol: string
    createdAt: Date
    updatedAt: Date
    perfil: {
        nombre: string
    }
    permisos: object
}

export interface User extends Usuario {
    access_token: string
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
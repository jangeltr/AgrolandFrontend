export interface User {
    access_token: string
    _id: string
    email: string
    name: string
    password: string
    rol: string
    createdAt: Date
    updatedAt: Date
    googleMapsApiKey: string
}

export interface NewUser {
    userName: string
    email: string
    nombre: string
    password: string
}

export interface UserLogin {
    userName: string
    email: string
    password: string
}
export interface Propietario {
    nombre: string
    telefono: string
    email: string
}

interface Coordenada {
    lat: number
    lng: number
}

export interface Predio {
    _id: string
    nombre: string
    ubicacion: string
    extension: number
    coordenadas: Coordenada[]
    propietario: Propietario
}

export interface NewPredio {
    nombre: string
    ubicacion: string
    extension: number
    coordenadas: Coordenada[]
    propietario: Propietario
}
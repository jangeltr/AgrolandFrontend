export interface Propietario {
    nombre: string
    telefono?: string
    email?: string
}

interface Coordenada {
    lat: number
    lng: number
}

interface cultivo {
    cultivo: string
    año: number
}
export interface Predio {
    _id: string
    nombre: string
    estado: string
    municipio: string
    extension: number
    coordenadas: Coordenada[]
    propietario: Propietario
    cultivos: cultivo[]
}

export interface NewPredio {
    nombre: string
    estado: string
    municipio: string
    extension: number
    coordenadas: Coordenada[]
    propietario: Propietario
}
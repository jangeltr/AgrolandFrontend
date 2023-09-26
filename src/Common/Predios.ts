import { Predio } from "./PredioTypes"
import { Coordenada } from "./PredioTypes"
import { Propietario } from "./PredioTypes"
import { NewPredio } from "./PredioTypes"
const App = import.meta.env.VITE_AGROLAND_NAME
const BackendUrl = import.meta.env.VITE_AGROLAND_BACKEND_URL

const headersList = {
    "Accept": "*/*",
    "User-Agent": App,
    "Content-Type": "application/json"
}

export async function getPredios(token: string | undefined = ""){
    const URL = BackendUrl + '/predios/getPredios'
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function newPredio(nombre: string, ubicacion: string, extension: number, coordenadas: Coordenada[], propietario: Propietario, token: string | undefined = ""){
    const predio: NewPredio = {
        nombre,
        ubicacion,
        extension,
        coordenadas,
        propietario
    }
    const body = JSON.stringify(predio)
    const URL = BackendUrl + '/predios/newPredio'
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "POST", body, headers })
    return response
}
import { Coordenada } from "./PredioTypes"
import { Propietario } from "./PredioTypes"
import { NewPredio, Predio } from "./PredioTypes"
const App = import.meta.env.VITE_AGROLAND_NAME
const BackendUrl = import.meta.env.VITE_AGROLAND_BACKEND_URL

const headersList = {
    "Accept": "*/*",
    "User-Agent": App,
    "Content-Type": "application/json"
}

export async function getPredios(estado: string, municipio: string, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getPredios?estado=${estado}&municipio=${municipio}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getPrediosPorCultivo(estado: string, municipio: string, cultivo: string, año: number, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getPrediosPorCultivo?estado=${estado}&municipio=${municipio}&cultivo=${cultivo}&anio=${año}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getPrediosSinCultivo(estado: string, municipio: string, año: number, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getPrediosSinCultivo?estado=${estado}&municipio=${municipio}&anio=${año}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getHasEstado(estado: string, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getHasEstado?estado=${estado}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getHasMunicipio(estado: string, municipio: string, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getHasMunicipio?estado=${estado}&municipio=${municipio}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getHasEstadoPorCultivo(estado: string, cultivo: string, año: number, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getHasEstadoPorCultivo?estado=${estado}&cultivo=${cultivo}&anio=${año}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function getHasMunicipioPorCultivo(estado: string, municipio: string, cultivo: string, año: number, token: string | undefined = ""){
    const URL = BackendUrl + `/predios/getHasMunicipioPorCultivo?estado=${estado}&municipio=${municipio}&cultivo=${cultivo}&anio=${año}`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "GET", headers })
    return response
}

export async function newPredio(nombre: string, estado: string, municipio: string, extension: number, coordenadas: Coordenada[], propietario: Propietario, token: string | undefined = ""){
    const predio: NewPredio = {
        nombre,
        estado,
        municipio,
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

export async function updatePredio(predio: Predio, token: string | undefined = ""){
    
    const body = JSON.stringify(predio)
    const URL = BackendUrl + '/predios/updatePredio'
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "PATCH", body, headers })
    return response
}

export async function addCultivoToPredio(idPredio: string, cultivo: string, año: number, token: string | undefined = ""){
    const data = {
        _id: idPredio,
        cultivo,
        año
    }
    const body = JSON.stringify(data)
    const URL = BackendUrl + `/predios/addCultivoToPredio`
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "POST", body, headers })
    return response
}

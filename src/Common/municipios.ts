const BackendUrl = import.meta.env.VITE_AGROLAND_BACKEND_URL
const App = import.meta.env.VITE_AGROLAND_NAME

const headersList = {
    "Accept": "*/*",
    "User-Agent": App,
    "Content-Type": "application/json"
}

export async function getMunicipios(estado:string){
    const URL = BackendUrl + '/predios/getMunicipiosFromEstado?estado='+estado
    const response = await fetch(URL, { 
        method: "GET",
        headers: headersList
    })
    return response
}

export async function getEstados(){
    const URL = BackendUrl + '/predios/getEstados'
    const response = await fetch(URL, { 
        method: "GET",
        headers: headersList
    })
    return response
}
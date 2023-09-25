const BackendUrl = import.meta.env.VITE_AGROLAND_BACKEND_URL
const App = import.meta.env.VITE_AGROLAND_NAME

const headersList = {
    "Accept": "*/*",
    "User-Agent": App,
    "Content-Type": "application/json"
}

export async function cultivos(){
    const URL = BackendUrl + '/predios/getCultivos'
    const response = await fetch(URL, { 
        method: "GET",
        headers: headersList
    })
    return response
}

export async function getApiGoogleMapsKey(token: string){
    const URL = BackendUrl + '/predios/getApiGoogleMapsKey'
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { 
        method: "GET",
        headers
    })
    return response
}
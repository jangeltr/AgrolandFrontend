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
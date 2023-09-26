import { NewUser, UserLogin } from '../Common/UserType';

const App = import.meta.env.VITE_AGROLAND_NAME
const BackendUrl = import.meta.env.VITE_AGROLAND_USUARIOS_URL

const headersList = {
    "Accept": "*/*",
    "User-Agent": App,
    "Content-Type": "application/json"
}

export async function loginUser(userName: string, email:string, password: string){
    if (email==='') email='prueba@prueba.com'
    const usuario: UserLogin = {
        App,
        userName,
        email,
        password,
    }
    const bodyContent = JSON.stringify(usuario)
    const URL = BackendUrl + '/usuarios/login'
    const response = await fetch(URL, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    })
    return response
}

export async function createUser(userName: string, email:string, password: string, nombre: string, rol = 'Usuario'){
    const usuario: NewUser = {
        App,
        userName,
        email,
        password,
        rol,
        perfil: {nombre},
    }
    const body = JSON.stringify(usuario)
    const URL = BackendUrl + '/usuarios/createuser'
    const response = await fetch(URL, { method: "POST", body, headers: headersList })
    return response
}

export async function getNumUsers(){
    const URL = BackendUrl + '/usuarios/getNumUsers?App='+App
    try {
        const response = await fetch(URL, { 
            method: "GET",
            headers: headersList
        })
        if (response.status===200) {
            return await response.json()
        }
        return -1
    }catch(error){
        return -1
    }
}

export async function createFirstUser(){
    const response =  await getNumUsers()
    if (response === -1) return "Error"
    if (response === 0) {
        await createUser(
            import.meta.env.VITE_FIRSTUSER_USERNAME,
            import.meta.env.VITE_FIRSTUSER_EMAIL,
            import.meta.env.VITE_FIRSTUSER_PASSWORD,
            import.meta.env.VITE_FIRSTUSER_NOMBRE,
            import.meta.env.VITE_FIRSTUSER_ROL,
        )
    }
    return "OK"
}

export async function logoutUser(token: string){
    const URL = BackendUrl + '/usuarios/logout'
    const headers = {
        "Authorization": "Bearer " + token,
        ...headersList
    }
    const response = await fetch(URL, { method: "POST", headers})
    return response
}
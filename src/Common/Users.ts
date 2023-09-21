import { NewUser, UserLogin } from '../Common/UserType';

const headersList = {
    "Accept": "*/*",
    "User-Agent": "Agroland",
    "Content-Type": "application/json"
}

export async function loginUser(userName: string, email:string, password: string){
    if (email==='') email='prueba@prueba.com'
    const usuario: UserLogin = {
        userName,
        email,
        password,
    }
    const bodyContent = JSON.stringify(usuario)
    const URL = import.meta.env.VITE_AGROLAND_BACKEND_URL + '/usuarios/login'
    const response = await fetch(URL, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    })
    return response
}

export async function createUser(userName: string, email:string, password: string, nombre: string, rol = 'Usuario'){
    const usuario: NewUser = {
        App: 'Agroland',
        userName,
        email,
        password,
        rol,
        perfil: {nombre},
    }
    const bodyContent = JSON.stringify(usuario)
    const URL = import.meta.env.VITE_AGROLAND_BACKEND_URL + '/usuarios/createuser'
    const response = await fetch(URL, { 
        method: "POST",
        body: bodyContent,
        headers: headersList
    })
    return response
}

export async function getNumUsers(){
    const URL = import.meta.env.VITE_AGROLAND_BACKEND_URL + '/usuarios/getNumUsers?App='+import.meta.env.VITE_AGROLAND_NAME
    const response = await fetch(URL, { 
        method: "GET",
        headers: headersList
    })
    return response
}

export async function createFirstUser(){
    const response =  await getNumUsers()
    if (response.status===200) {
        const data = await response.json()
        if (data===0) {
            const response = await createUser(
                import.meta.env.VITE_FIRSTUSER_USERNAME,
                import.meta.env.VITE_FIRSTUSER_EMAIL,
                import.meta.env.VITE_FIRSTUSER_PASSWORD,
                import.meta.env.VITE_FIRSTUSER_NOMBRE,
                import.meta.env.VITE_FIRSTUSER_ROL,
            )
            if (response.status===201) {
                console.log('Se ejecuto por primera vez y se creo el usuario Admin')
            }
        }
    }
}
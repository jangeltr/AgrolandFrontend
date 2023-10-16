import { useContext } from "react"
import { MyContext } from '../Context/context'
import { getFecha } from "../Common/Functions"
export default function MisDatos() {
    const contexto = useContext(MyContext)
    return (
        <div className=' w-full flex justify-center'>
            <div className=" max-w-7xl flex-col w-full text-gray-800 mt-5 w-96">
                <div className="flex justify-center">
                    <h1 className=' text-2xl text-gray-900'>Mis Datos</h1>
                </div>
                <div className='pl-5 pt-5 pr-5 block'>
                    <label className='mt-2 text-base text-principal block'>Nombre de usuario</label>
                    <input type="text" id='username' className=' rounded-lg border-1 border-principal text-secundary w-full'
                        value={contexto?.data?.user?.userName}
                    />
                </div>
                <div className='pl-5 pt-5 pr-5 block'>
                    <label className='mt-2 text-base text-principal block'>eMail</label>
                    <input type="text" id='email' className=' rounded-lg border-1 border-principal text-secundary w-full'
                        value={contexto?.data.user?.email}
                        />
                </div>
                <div className='pl-5 pt-5 pr-5 block'>
                    <label className='mt-2 text-base text-principal block'>Nombre</label>
                    <input type="text" id='nombre' className=' rounded-lg border-1 border-principal text-secundary w-full'
                        value={contexto?.data.user?.perfil.nombre}
                    />
                </div>
                <div className='pl-5 pt-5 pr-5 block'>
                    <label className='mt-2 text-base text-principal block'>Fecha de registro</label>
                    <input type="text" id='nombre' className=' rounded-lg border-1 border-principal text-secundary w-full'
                        value={getFecha(contexto?.data.user?.createdAt? contexto.data.user.createdAt.toString() : new Date().toString())}
                    />
                </div>
            </div>
        </div>
    )
}
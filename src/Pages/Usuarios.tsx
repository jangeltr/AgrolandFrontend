import { useContext, useState, useEffect } from 'react'

import { MyContext } from '../Context/context'
import { MySpinner } from '../Components/Spinner'
import { Reject } from '../Components/Alerts'
import { Usuario } from '../Common/UserType'
import { getNumUsers, getUsers } from '../Common/Users'
import { getFecha } from '../Common/Functions'

export default function Usuarios() {
    const contexto = useContext(MyContext)
    const [showSpinner, setShowSpinner] = useState(true)
    const [showErrorBD, setShowErrorBD] = useState(false)
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [filterUsuarios, setFilterUsuarios] = useState<Usuario[]>([])
    const [totalUsuarios, setTotalUsuarios] = useState(0)
    const [page, setPage] = useState(1)
    useEffect(() => {
        async function fetchData() {
            const totalUsers = await getNumUsers()
            setTotalUsuarios(totalUsers)
            const response = await getUsers(page, contexto?.data.user?.access_token)
            setShowSpinner(false)
            if (response.status==200) {
                const data:Usuario[]  = await response.json()
                setUsuarios(data)
                setFilterUsuarios(data)
            }else{
                setShowErrorBD(true)
            }
        }
        fetchData()
    }, [page])
    return (
        <>
            <div className=' w-full flex justify-center'>
                <div className=" max-w-7xl flex-col w-full text-gray-800 mt-5">
                    <div className='flex justify-center'>
                        <div className='flex-col'>
                            <div className=' flex justify-center'>
                                <h1 className=' text-2xl text-gray-900'>Lista de Usuarios</h1>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center mt-5 mb-5 '>
                        <input type="text" className=' w-80 rounded-lg p-2 text-gray-400 outline-none focus:border focus:border-green-400' placeholder='Buscar usuario' onChange={
                            (e) => {
                                const value = e.target.value
                                const filter = usuarios.filter((usuario) => {
                                    return usuario.perfil.nombre.toLowerCase().indexOf(value.toLowerCase()) > -1
                                })
                                setFilterUsuarios(filter)
                            }
                        }/>
                    </div>
                    <div className='flex justify-center'>
                        <table className=" border-separate border-spacing-2 border border-principal rounded-md shadow-lg lg:mx-10">
                            <thead>
                                <tr className=' '>
                                    <th className="border border-secundary text-principal">Usuario</th>
                                    <th className="border border-secundary text-principal">Nombre</th>
                                    <th className="border border-secundary text-principal">eMail</th>
                                    <th className="border border-secundary text-principal">Fecha de registro</th>
                                </tr>
                            </thead>
                            <tbody className='text-secundary'>
                                {
                                    filterUsuarios.map((usuario) => {
                                        return (
                                            <tr key={usuario._id} className=' hover:bg-gray-100'>
                                                <td className="border border-slate-300 md:px-5">{usuario.userName}</td>
                                                <td className="border border-slate-300 md:px-5">{usuario.perfil.nombre}</td>
                                                <td className="border border-slate-300 md:px-5">{usuario.email}</td>
                                                <td className="border border-slate-300 md:px-5">{getFecha(usuario.createdAt.toString())}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className=' flex justify-center mx-10'>
                        <nav className=" flex items-center justify-around mt-10 w-full max-w-xl" aria-label="Pagination">
                            <div className=" w-2/3">
                                <span className="font-medium">1 a {filterUsuarios.length} de un total de {totalUsuarios} usuarios</span>
                            </div>
                            <div className=" w-1/3 flex justify-end">
                                <a href="#"
                                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                    onClick={() => {
                                        if (page>1) setPage(page-1)
                                    }}
                                >
                                    Previo
                                </a>
                                <a href="#"
                                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                onClick={() => {
                                    if (page<Math.ceil(totalUsuarios/20))
                                    setPage(page+1)
                                }}
                                >
                                    Siguiente
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {showSpinner && <MySpinner />}
            <Reject show={showErrorBD} title='Error' text='No se pudo conectar a la BD de Agroland' setShow={setShowErrorBD}/>
        </>
    )
}
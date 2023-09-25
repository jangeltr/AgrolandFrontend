import { useState, useEffect } from 'react'
import { MySpinner } from '../Components/Spinner'
import { Reject } from '../Components/Alerts'
import { cultivos } from '../Common/cultivos'
import { Cultivo } from '../Common/Cultivo'
export default function Cultivos() {
    const [showSpinner, setShowSpinner] = useState(true)
    const [showErrorBD, setShowErrorBD] = useState(false)
    const [allCultivos, setAllCultivos] = useState<Cultivo[]>([])
    const [filterCultivos, setFilterCultivs] = useState<Cultivo[]>([])
    useEffect(() => {
        async function fetchData() {
            const response = await cultivos()
            setShowSpinner(false)
            if (response.status==200) {
                const data:Cultivo[]  = await response.json()
                setAllCultivos(data)
                setFilterCultivs(data)
            }else{
                setShowErrorBD(true)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <div className=' w-full flex justify-center'>
                <div className=" max-w-7xl flex-col w-full text-gray-800 mt-5">
                    <div className='flex justify-center'>
                        <div className='flex-col justify-center'>
                            <div>
                                <h1 className=' text-2xl text-gray-900'>Lista de cultivos en Mexico</h1>
                            </div>
                            <div className=' flex justify-center'>
                                <h1 className=' text-lg text-gray-700'>({filterCultivos.length}) Cultivos</h1>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center mt-5 mb-5 '>
                        <input type="text" className=' w-80 rounded-lg p-2 text-gray-400 outline-none focus:border focus:border-green-400' placeholder='Buscar cultivo' onChange={
                            (e) => {
                                const value = e.target.value
                                const filter = allCultivos.filter((cultivo) => {
                                    return cultivo.nombre.toLowerCase().indexOf(value.toLowerCase()) > -1
                                })
                                setFilterCultivs(filter)
                            }
                        }/>
                    </div>
                    <div className='flex justify-center'>
                        <table className="border-separate border-spacing-2 border border-principal rounded-md shadow-lg">
                            <thead>
                                <tr>
                                    <td className="border border-secundary text-principal">Id</td>
                                    <td className="border border-secundary text-principal">Nombre</td>
                                </tr>
                            </thead>
                            <tbody className='text-secundary'>
                                {
                                    filterCultivos.map((cultivo) => {
                                        return (
                                            <tr key={cultivo._id} className=' hover:bg-gray-100'>
                                                <td className="border border-slate-300">{cultivo.ID}</td>
                                                <td className="border border-slate-300">{cultivo.nombre}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showSpinner && <MySpinner />}
            <Reject show={showErrorBD} title='Error' text='No se pudo conectar a la BD de Agroland' setShow={setShowErrorBD}/>
        </>
    )
}
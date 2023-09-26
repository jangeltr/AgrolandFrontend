import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { MySpinner } from '../../Components/Spinner';
import { Predio } from '../../Common/PredioTypes';
import { getPredios } from '../../Common/Predios';
import { Reject } from '../../Components/Alerts';

export default function ShowPrediosAdmin(): JSX.Element {
    const navigate = useNavigate()
    const contexto = useContext(MyContext)
    const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    const [predios, setPredios] = useState<Predio[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await getPredios(contexto?.data.user?.access_token)
            setShowSpinner(false)
            if (response.status==200) {
                const data:Predio[]  = await response.json()
                setPredios(data)
            }else{
                setShowError(true)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {
                predios.length==0 && 
                    <div className=' w-full flex justify-center'>
                        <h1 className=' text-secundary'>No hay predios registrados</h1>
                    </div>
            }
            <div className=' mt-5 mb-5 flex justify-center'>
                    <button className=' p-2 bg-gray-700 rounded-lg text-gray-200' onClick={()=>{navigate('/predios/newPredio')}}>
                        <h1 className=' text-secundary'>Agregar Predio</h1>
                    </button>
                </div>
            <div className='w-full lg:max-w-5xl m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    predios.map((predio:Predio) => {
                        return (
                            <div key={predio._id} className=' border border-principal rounded-lg cursor-pointer flex flex-col p-2 shadow-lg'
                                onClick={() => {
                                    navigate('/predios/predio', {state: {predio}})
                                }}
                            >
                                <div className=' w-full flex'>
                                    <h1 className=' text-principal'>Nombre: </h1>
                                    <h1 className=' text-secundary ml-4'>{predio.nombre}</h1>
                                </div>
                                <div className=' w-full flex'>
                                    <h1 className=' text-principal'>Ubicacion: </h1>
                                    <h1 className=' text-secundary ml-4'>{predio.ubicacion}</h1>
                                </div>
                                <div className=' w-full flex'>
                                    <h1 className=' text-principal'>Extension: </h1>
                                    <h1 className=' text-secundary ml-4'>{predio.extension} has</h1>
                                </div>
                            </div>
                        )
                    })  
                }
            </div>
            {showSpinner && <MySpinner />}
            <Reject show={showError} title='Error' text='No se puede obtener la lista de predios actual' setShow={setShowError}/>
        </>
    )
}
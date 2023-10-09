import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { MySpinner } from '../../Components/Spinner';
import { Predio } from '../../Common/PredioTypes';
import { getHasEstado, getHasMunicipio, getPredios } from '../../Common/Predios';
import { getEstados, getMunicipios } from '../../Common/municipios';
import { Reject } from '../../Components/Alerts';

export default function ShowPrediosAdmin(): JSX.Element {
    const navigate = useNavigate()
    const contexto = useContext(MyContext)
    const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    const [predios, setPredios] = useState<Predio[]>([])
    const [estados, setEstados] = useState<string[]>([])
    const [estado, setEstado] = useState<string | null>(null)
    const [municipios, setMunicipios] = useState<string[]>([])
    const [municipio, setMunicipio] = useState<string | null>(null)
    const [hasEstado, setHasEstado] = useState<number>(0)
    const [hasMunicipio, setHasMunicipio] = useState<number>(0)
    useEffect(() => {
        async function fetchData() {
            const responseEstados = await getEstados()
            if (responseEstados.status==200) {
                const data = await responseEstados.json()
                setEstados(data)
                setEstado(data[0])
            } else setShowError(true)
        }
        fetchData()
    }, [])
    useEffect(() => {
        async function fetchData() {
            if (estado) {
                const responseMunicipios = await getMunicipios(estado)
                if (responseMunicipios.status==200) {
                    const data = await responseMunicipios.json()
                    setMunicipios(data)
                    setMunicipio(data[0])
                    const responseHasEstado = await getHasEstado(estado)
                    if (responseHasEstado.status==200) {
                        const data = await responseHasEstado.text()
                        setHasEstado(parseFloat(data))
                    } else setShowError(true)
                }else setShowError(true)
            }
        }
        fetchData()
    }, [estado])
    useEffect(() => {
        async function fetchData() {
            if (estado && municipio) {
                const responsePredios = await getPredios(estado, municipio, contexto?.data.user?.access_token)
                const responseHasMunicipio = await getHasMunicipio(estado, municipio)
                setShowSpinner(false)
                if (responseHasMunicipio.status==200) {
                    const data = await responseHasMunicipio.text()
                    setHasMunicipio(parseFloat(data))
                } else setShowError(true)
                if (responsePredios.status==200) {
                    const data:Predio[]  = await responsePredios.json()
                    setPredios(data)
                }else setShowError(true)
            }
        }
        fetchData()
    }, [municipio])
    return (
        <>
            {
                predios.length==0 && 
                    <div className=' w-full flex justify-center'>
                        <h1 className=' text-secundary'>No hay predios registrados en este Municipio</h1>
                    </div>
            }
            <div className=' mt-5 mb-5 flex justify-center'>
                <button className=' p-2 bg-gray-700 rounded-lg text-gray-200' onClick={()=>{navigate('/predios/newPredio')}}>
                    <h1 className=' text-secundary'>Agregar Predio</h1>
                </button>
                <button className='ml-5 p-2 bg-gray-700 rounded-lg text-gray-200' onClick={()=>{navigate('/predios/showPrediosOnMap', {state: {predios}})}}>
                    <h1 className=' text-secundary'>Ver en mapa</h1>
                </button>
            </div>
            <div className='flex justify-around'>
                <div className=' w-1/3'>
                    <label className='mt-2 text-base text-principal block'>Estado</label>
                    <select id="estado" className=' rounded-lg border-1 border-principal text-secundary w-full'
                        onChange={
                            ()=>{
                                setEstado((document.getElementById('estado') as HTMLInputElement).value)
                            }
                        }
                    >
                        {
                            estados.map((estado) => {
                                return (
                                    <option value={estado} key={estado}>
                                        {estado}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="">Has registradas: {hasEstado}</label>
                </div>
                <div className=' w-1/3'>
                    <label className='mt-2 text-base text-principal block'>Municipio</label>
                    <select id="municipio" className=' rounded-lg border-1 border-principal text-secundary w-full'
                        onChange={
                            ()=>{
                                setMunicipio((document.getElementById('municipio') as HTMLInputElement).value)
                            }
                        }
                    >
                        {
                            municipios.map((municipio) => {
                                return (
                                    <option value={municipio} key={municipio}>
                                        {municipio}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="">Has registradas: {hasMunicipio}</label>
                </div>
            </div>
            <div className='w-full lg:max-w-5xl m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    predios.map((predio:Predio) => {
                        return (
                            <div key={predio._id} className=' border border-principal rounded-lg cursor-pointer flex flex-col p-2 shadow-lg'
                                onClick={() => {
                                    navigate('/predios/editPredio', {state: {predio}})
                                }}
                            >
                                <div className=' w-full flex'>
                                    <h1 className=' text-principal'>Nombre: </h1>
                                    <h1 className=' text-secundary ml-4'>{predio.nombre}</h1>
                                </div>
                                <div className=' w-full flex'>
                                    <h1 className=' text-principal'>Propietario: </h1>
                                    <h1 className=' text-secundary ml-4'>{predio.propietario.nombre}</h1>
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
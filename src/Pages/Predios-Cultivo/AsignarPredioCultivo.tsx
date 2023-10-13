import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { MySpinner } from '../../Components/Spinner';
import { Predio } from '../../Common/PredioTypes';
import { getHasEstado, getHasEstadoPorCultivo, getHasMunicipio, getHasMunicipioPorCultivo, getPrediosPorCultivo, getPrediosSinCultivo, addCultivoToPredio } from '../../Common/Predios';
import { getEstados, getMunicipios } from '../../Common/municipios';
import { Reject } from '../../Components/Alerts';
import { cultivos } from '../../Common/cultivos'
import { Cultivo } from '../../Common/Cultivo'

export default function AsignarPredioCultivo(): JSX.Element {
    const navigate = useNavigate()
    const contexto = useContext(MyContext)
    const [showSpinner, setShowSpinner] = useState(true)
    const [showError, setShowError] = useState(false)
    const [predios, setPredios] = useState<Predio[]>([])
    const [prediosSinCultivo, setPrediosSinCultivo] = useState<Predio[]>([])
    const [estados, setEstados] = useState<string[]>([])
    const [estado, setEstado] = useState<string | null>(null)
    const [municipios, setMunicipios] = useState<string[]>([])
    const [municipio, setMunicipio] = useState<string | null>(null)
    const [hasEstado, setHasEstado] = useState<number>(0)
    const [hasMunicipio, setHasMunicipio] = useState<number>(0)
    const [hasEstadoPorCultivo, setHasEstadoPorCultivo] = useState<number>(0)
    const [hasMunicipioPorCultivo, setHasMunicipioPorCultivo] = useState<number>(0)
    const [nPredios, setNPredios] = useState<number>(0)
    const [nPrediosSinCultivo, setNPrediosSinCultivo] = useState<number>(0)
    const [listCultivos, setListCultivos] = useState<Cultivo[]>([])
    const [cultivo, setCultivo] = useState<string | null>(null)
    const [año, setAño] = useState<number>(2023)
    async function getPredios() {
        if (estado && municipio && cultivo) {
            setShowSpinner(true)
            const responsePredios = await getPrediosPorCultivo(estado, municipio, cultivo, año, contexto?.data.user?.access_token)
            const responsePrediosSinCultivo = await getPrediosSinCultivo(estado, municipio, año, contexto?.data.user?.access_token)
            const responseHasMunicipio = await getHasMunicipio(estado, municipio)
            const responseHasEstadoPorCultivo = await getHasEstadoPorCultivo(estado, cultivo, año)
            const responseHasMunicipioPorCultivo = await getHasMunicipioPorCultivo(estado, municipio, cultivo, año)
            setShowSpinner(false)
            if (responseHasMunicipio.status==200) {
                const data = await responseHasMunicipio.text()
                setHasMunicipio(parseFloat(data))
            } else setShowError(true)
            if (responseHasEstadoPorCultivo.status==200) {
                const data = await responseHasEstadoPorCultivo.text()
                setHasEstadoPorCultivo(parseFloat(data))
                
            } else setShowError(true)
            if (responseHasMunicipioPorCultivo.status==200) {
                const data = await responseHasMunicipioPorCultivo.text()
                setHasMunicipioPorCultivo(parseFloat(data))
                
            } else setShowError(true)
            if (responsePredios.status==200) {
                const data:Predio[]  = await responsePredios.json()
                setPredios(data)
                setNPredios(data.length)
            }else setShowError(true)
            if (responsePrediosSinCultivo.status==200) {
                const data:Predio[]  = await responsePrediosSinCultivo.json()
                setPrediosSinCultivo(data)
                setNPrediosSinCultivo(data.length)
            }else setShowError(true)
        }
    }
    async function asignarCultivo(predio:Predio) {
        if (año && cultivo) {
            await addCultivoToPredio(predio._id, cultivo, año, contexto?.data.user?.access_token)
            await getPredios()
        }
    }
    useEffect(() => {
        async function fetchData() {
            const responseEstados = await getEstados()
            const responseCultivos = await cultivos()
            if (responseEstados.status==200) {
                const data = await responseEstados.json()
                setEstados(data)
                setEstado(data[0])
            } else setShowError(true)
            if (responseCultivos.status==200) {
                const data:Cultivo[]  = await responseCultivos.json()
                setListCultivos(data)
                setCultivo(data[0].nombre)
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
        getPredios()
    }, [municipio, cultivo, año])
    return (
        <div className='w-full flex items-center justify-center mt-8'>
            <div className='w-full lg:max-w-5xl flex-col'>
                <div className=' mb-5'>
                    <h1 className=' text-3xl text-center text-principal'>Predios con {cultivo} en el {año}</h1>
                </div>    
                <div className=' w-full flex justify-center'>
                    <h1 className=' text-secundary'>{nPredios} Predios</h1>
                </div>
                <div className=' mt-5 mb-5 flex justify-center'>
                    {
                        nPredios>0 &&
                        <button className='ml-5 p-2 bg-gray-700 rounded-lg text-gray-200' onClick={()=>{navigate('/predios/showPrediosOnMap', {state: {predios}})}}>
                            <h1 className=' text-secundary'>Ver en mapa</h1>
                        </button>
                    }

                </div>
                <div className='flex flex-wrap justify-around'>
                    <div className='w-full md:w-1/2 lg:w-1/3 pl-5 pr-5'>
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
                        <span>Has registradas de todos los cultivos: </span>
                        <span className=' italic'>{hasEstado}</span>
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 pl-5 pr-5'>
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
                        <span>Has registradas de todos los cultivos: </span>
                        <span className=' italic'>{hasMunicipio}</span>
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 pl-5 pr-5'>
                        <label className='mt-2 text-base text-principal block'>Cultivo</label>
                        <select id="cultivo" className=' rounded-lg border-1 border-principal text-secundary w-full'
                            onChange={
                                ()=>{
                                    setCultivo((document.getElementById('cultivo') as HTMLInputElement).value)
                                }
                            }
                        >
                            {
                                listCultivos.map((cultivo) => {
                                    return (
                                        <option value={cultivo.nombre} key={cultivo._id}>
                                            {cultivo.nombre}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <span>Has registradas de {cultivo} en el estado: </span>
                        <span className=' italic'>{hasEstadoPorCultivo}</span><br />
                        <span>Has registradas de {cultivo} en el municipio: </span>
                        <span className=' italic'>{hasMunicipioPorCultivo}</span>
                    </div>
                    <div className='w-full md:w-1/2 lg:w-1/3 pl-5 pr-5'>
                        <label className='mt-2 text-base text-principal block'>Año</label>
                        <input type='number' min={2023} max={2050} defaultValue={2023} id="ano" className=' rounded-lg border-1 border-principal text-secundary w-full pl-2'
                            onChange={
                                ()=>{
                                    setAño(parseInt((document.getElementById('ano') as HTMLInputElement).value))
                                }
                            }
                        />
                    </div>
                </div>
                <div className=' w-full flex justify-center'>
                    <div className='w-full lg:max-w-5xl m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            predios.map((predio:Predio) => {
                                return (
                                    <div key={predio._id} className=' border border-principal rounded-lg flex flex-col p-2 shadow-lg'>
                                        <div className=' w-full flex'>
                                            <h1 className=' text-principal'>Nombre: </h1>
                                            <h1 className=' text-secundary ml-4 cursor-pointer text-green-700 hover:text-green-500'
                                                onClick={() => {
                                                    navigate('/predios/predio', {state: {predio}})
                                                }}
                                            >
                                                {predio.nombre}
                                            </h1>
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
                </div>
                {/*////////////////////////////////////////////////////////////////////////////////////////////////*/}
                <hr className=''/>
                <div className=' mt-10 mb-5'>
                    <h1 className=' text-3xl text-center text-principal'>Predios sin cultivo en el {año}</h1>
                </div>    
                <div className=' w-full flex justify-center'>
                    <h1 className=' text-secundary'>{nPrediosSinCultivo} Predios</h1>
                </div>
                <div className=' mt-5 mb-2 flex justify-center'>
                    {
                        nPrediosSinCultivo>0 &&
                            <button className='ml-5 p-2 bg-gray-700 rounded-lg text-gray-200' onClick={()=>{navigate('/predios/showPrediosOnMap', {state: {prediosSinCultivo}})}}>
                                <h1 className=' text-secundary'>Ver en mapa</h1>
                            </button>
                    }
                </div>
                <div className=' w-full flex justify-center'>
                    <div className='w-full lg:max-w-5xl m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            prediosSinCultivo.map((predio:Predio) => {
                                return (
                                    <div key={predio._id} className=' border border-principal rounded-lg flex flex-col p-2 shadow-lg'>
                                        <div className=' w-full flex'>
                                            <h1 className=' text-principal'>Nombre: </h1>
                                            <h1 className=' text-secundary ml-4 cursor-pointer text-green-700 hover:text-green-500'
                                                onClick={() => {
                                                    navigate('/predios/predio', {state: {predio}})
                                                }}
                                            >
                                                {predio.nombre}
                                            </h1>
                                        </div>
                                        <div className=' w-full flex'>
                                            <h1 className=' text-principal'>Propietario: </h1>
                                            <h1 className=' text-secundary ml-4'>{predio.propietario.nombre}</h1>
                                        </div>
                                        <div className=' w-full flex'>
                                            <h1 className=' text-principal'>Extension: </h1>
                                            <h1 className=' text-secundary ml-4'>{predio.extension} has</h1>
                                        </div>
                                        <div className=' w-full flex'>
                                            <button className=' w-full bg-gray-700 text-white rounded-lg' onClick={()=>{asignarCultivo(predio)}}>Asignar {cultivo}</button>
                                        </div>
                                    </div>
                                )
                            })  
                        }
                    </div>
                </div>
                {showSpinner && <MySpinner />}
                <Reject show={showError} title='Error' text='No se puede obtener la lista de predios actual' setShow={setShowError}/>
            </div>
        </div>
    )
}
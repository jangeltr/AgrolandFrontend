import { useContext, useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form';

import { GoogleMap, useJsApiLoader, DrawingManager, Polygon } from '@react-google-maps/api'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { SaveIcon, GpsIcon } from '../../Components/SVG_icons'
import { MySpinner } from '../../Components/Spinner'
import { Success, Reject, RejectConnectBD } from '../../Components/Alerts'
import { getEstados, getMunicipios } from '../../Common/municipios'
import { inputEmailLogin, inputNombre, inputNombrePredio, inputTelefono } from '../../Common/FormInputObjects';
import { newPredio } from '../../Common/Predios';
import { Coordenada, Propietario } from '../../Common/PredioTypes';


export default function NewPredio() {
    const contexto = useContext(MyContext)
    const [polygonCoords, setPolygonCoords] = useState<string>('')
    const [area, setArea] = useState<string>('')
    const [estados, setEstados] = useState<string[]>([])
    const [estado, setEstado] = useState<string | null>(null)
    const [municipios, setMunicipios] = useState<string[]>([])
    const [showSpinner, setShowSpinner] = useState(false)
    const [showErrorGetEstados, setShowErrorGetEstados] = useState(false)
    const [showErrorGetMunicipios, setShowErrorGetMunicipios] = useState(false)
    const [showSolicitudRechazada, setShowSolicitudRechazada] = useState(false)
    const [showPredioCreado, setShowPredioCreado] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const setCoords = (coords: Coordenada[])=> {
        setPolygonCoords(JSON.stringify(coords))
        const poly = new google.maps.Polygon({paths: coords})
        const path = poly.getPath()
        const a = google.maps.geometry.spherical.computeArea(path)
        setArea((a/10000).toString())
    }
    useEffect(() => {
        async function fetchData() {
            const responseEstados = await getEstados()
            setShowSpinner(false)
            if (responseEstados.status==200) {
                const data = await responseEstados.json()
                setEstados(data)
                setEstado(data[0])
            }else{
                setShowErrorGetEstados(true)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        async function fetchData() {
            if (estado) {
                const response = await getMunicipios(estado)
                if (response.status==200) {
                    const data = await response.json()
                    setMunicipios(data)
                }else{
                    setShowErrorGetMunicipios(true)
                }
            }
        }
        fetchData()
    }, [estado])
    //////////////////////////////////////////////////////Agregar el Predio//////////////////////////////////////////////////
    const onSubmit = handleSubmit(async(data) => {
        setShowSpinner(true)
        const propietario: Propietario={
            nombre: data.nombrePropietario,
        }
        if (data.telefono!='') propietario.telefono = data.telefono
        if (data.email!='') propietario.email = data.email
        const coordenadas = JSON.parse(polygonCoords)
        const estado = (document.getElementById('estado') as HTMLInputElement).value
        const municipio = (document.getElementById('municipio') as HTMLInputElement).value
        const extension = parseFloat((document.getElementById('Has') as HTMLInputElement).value)
        const response = await newPredio(data.nombrePredio, estado, municipio, extension, coordenadas, propietario, contexto?.data.user?.access_token)
        setShowSpinner(false)
        if (response.status==201) {
            setShowPredioCreado(true)
        }
        else {
            setShowSolicitudRechazada(true)
        }
    })
    ////////////////////////////////////////////////////////////Mapa////////////////////////////////////////////////////////
    const [mapZoom, setMapZoom] = useState(8)
    const [mapCenter] = useState({ lat: 20.5389824, lng: -103.3273344 })
    const mapRef = useRef<google.maps.Map | null>(null);
    type Coords =  {
        lat: number;
        lng: number;
    }[]
    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: contexto?.data.googleMapsApiKey ? contexto?.data.googleMapsApiKey : '',
        libraries: ['drawing']
    })
    const onLoadMap = (map: google.maps.Map) => {
        mapRef.current = map;
    }
    const onZoomChanged = () => {
        if (mapRef.current) {
            const zoom = mapRef.current.getZoom()
            setMapZoom(zoom? zoom : 8)
        }
    }
    //////////////////////////////////////////////// Poligono   ////////////////////////////////////////////////////////////
    const [polygon, setPolygon] = useState<Coords>([]);
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
    const polygonRef = useRef<google.maps.Polygon | null>(null);

    const polygonOptions = {
        fillColor: "#00ff40",
        fillOpacity: .015,
        strokeWeight: 3,
        strokeColor: "#FF0000",
    }
    const drawingManagerOptions = {
        polygonOptions,
        drawingControl: true,
        drawingControlOptions: {
            position: window.google?.maps?.ControlPosition?.TOP_CENTER,
            drawingModes: [
                window.google?.maps?.drawing?.OverlayType?.POLYGON
            ]
        }
    }
    const onLoadDrawingManager = (drawingManager: google.maps.drawing.DrawingManager) => {
        drawingManagerRef.current = drawingManager;
    }
    const onOverlayComplete = (overlayEvent: google.maps.drawing.OverlayCompleteEvent) => {
        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(null);
            if (overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
                if (overlayEvent.overlay){
                    const newPolygon = overlayEvent.overlay.getPath().getArray()
                        .map(
                            (latLng: google.maps.drawing.OverlayType) => ({
                                lat: latLng.lat(), lng: latLng.lng() 
                            })
                        )
                    const startPoint = newPolygon[0];
                    newPolygon.push(startPoint);
                    overlayEvent.overlay?.setMap(null);
                    setPolygon(newPolygon);
                    setCoords(newPolygon);
                }
            }
        }
    }
    const onLoadPolygon = (poly: google.maps.Polygon) => {
        polygonRef.current = poly;
    }
    const onEditPolygon = () => {
        if (polygonRef.current) {
            const coords: Coords = polygonRef.current.getPath().getArray()
                .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
            setPolygon(coords);
            setCoords(coords);
        }
    }
    /////////////////////////////////////////// Return Componente //////////////////////////////////////////////////////////
    return isLoaded ? (
        <>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full lg:max-w-5xl flex-col mb-8'>
                    <div className=' w-full flex justify-center'>
                        <label htmlFor="">Nuevo predio</label>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className='w-full flex flex-wrap justify-around p-5'>
                            <div id="map1" className='w-full lg:w-2/3 p-2 h-96 bg-gray-100 rounded-lg shadow-lg'>
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={mapCenter}
                                    zoom={mapZoom}
                                    onLoad={onLoadMap}
                                    onZoomChanged={onZoomChanged}
                                    mapTypeId={google.maps.MapTypeId.HYBRID}
                                >
                                    <>
                                        <DrawingManager
                                            onLoad={onLoadDrawingManager}
                                            onOverlayComplete={onOverlayComplete}
                                            options={drawingManagerOptions}
                                        />
                                        <Polygon
                                            options={polygonOptions}
                                            paths={polygon}
                                            editable
                                            draggable
                                            onLoad={(event) => onLoadPolygon(event)}
                                            onDragEnd={() => {onEditPolygon()}}
                                            onMouseUp={() => {onEditPolygon()}}
                                        />
                                    </>
                                </GoogleMap>
                            </div>
                            <div className=' w-1/2 lg:w-1/3 pl-5 pt-5 pr-5'>
                                <h1 className='text-lg text-principal'>Datos del predio</h1>
                                <label className='mt-2 text-base text-principal block'>Nombre</label>
                                <input type="text" id='nombrePredio' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    {...register('nombrePredio', inputNombrePredio)}
                                />
                                {
                                    errors.nombrePredio && <span className='text-red-500 text-xs'>{
                                        typeof errors.nombrePredio?.message=='string' ? errors.nombrePredio?.message : ''
                                    }</span>
                                }
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
                                <label className='mt-2 text-base text-principal block'>Municipio</label>
                                <select id="municipio" className=' rounded-lg border-1 border-principal text-secundary w-full'>
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
                            </div>
                            <div className=' w-1/2  lg:p-5 pt-5'>
                                <h1 className='text-lg text-principal'>Datos del Propietario</h1>
                                <label className='mt-2 text-base text-principal block'>Nombre</label>
                                <input type="text" id='nombrePropietario' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    {...register('nombrePropietario', inputNombre)}
                                />
                                {
                                    errors.userName && <span className='text-red-500 text-xs'>{
                                        typeof errors.userName?.message=='string' ? errors.userName?.message : ''
                                    }</span>
                                }
                                <label className='mt-2 text-base text-principal block'>Telefono</label>
                                <input type="text" id='telefono' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    {...register('telefono', inputTelefono)}
                                />
                                {
                                    errors.telefono && <span className='text-red-500 text-xs'>{
                                        typeof errors.telefono?.message=='string' ? errors.telefono?.message : ''
                                    }</span>
                                }
                                <label className='mt-2 text-base text-principal block'>eMail</label>
                                <input type="text" id='email' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    {...register('email', inputEmailLogin)}
                                />
                                {
                                    errors.email && <span className='text-red-500 text-xs'>{
                                        typeof errors.email?.message=='string' ? errors.email?.message : ''
                                    }</span>
                                }
                            </div>
                            <div className=' w-1/2 lg:p-5 mt-4'>
                                <div className='flex items-center justify-center'>
                                    <div className='mr-5'>
                                        <GpsIcon/>
                                    </div>
                                    <label className=' text-base text-principal block'>Coordenadas del predio</label>
                                </div>
                                <textarea id='taCoordenadas' className='w-full rounded-lg border-1 border-principal text-secundary text-sm mt-4'
                                    rows={5} value={polygonCoords} required/>
                                <label className='mt-2 text-base text-principal block'>Extension en Has.</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full' value={area}/>
                            </div>
                        </div>
                        <div className='mt-2 flex justify-center'>
                            <button type='submit' className=' border-principal rounded-lg w-40 p-2 border-2 flex justify-around text-white bg-gray-700'>
                                <SaveIcon/>Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showSpinner && <MySpinner />}
            <Success show={showPredioCreado} title='Predios' text={'Predio agregado'} setShow={setShowPredioCreado}/>
            <Reject show={showSolicitudRechazada} title='Predios' text={'Hay un error en los datos, por favor revice y corrija'} setShow={setShowSolicitudRechazada}/>
            <RejectConnectBD show={showErrorGetEstados} title='Error' text='No pudo obtener la lista de estados de la BD Agroland' setShow={setShowErrorGetEstados}/>
            <RejectConnectBD show={showErrorGetMunicipios} title='Error' text='No pudo obtener la lista de municipios de la BD Agroland' setShow={setShowErrorGetMunicipios}/>
        </>
    ) : <></>
}
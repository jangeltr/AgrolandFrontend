import { useContext, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { GoogleMap, useJsApiLoader, DrawingManager, Polygon } from '@react-google-maps/api'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { GpsIcon } from '../../Components/SVG_icons'
import { Predio } from '../../Common/PredioTypes'

export default function Predio() {
    const contexto = useContext(MyContext)
    const location = useLocation()
    const [predio] = useState<Predio>(location.state.predio)

    ////////////////////////////////////////////////////////////Mapa////////////////////////////////////////////////////////
    const [mapZoom, setMapZoom] = useState(14)
    const [mapCenter] = useState(predio.coordenadas[0])
    const mapRef = useRef<google.maps.Map | null>(null);
    type Coords =  {
        lat: number;
        lng: number;
    }[]
    const containerStyle = {
        width: '100%',
        height: '100%'
    }
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
    const [polygon, setPolygon] = useState<Coords>(predio.coordenadas);
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
        drawingControl: false,
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
                }
            }
        }
    }
    const onLoadPolygon = (poly: google.maps.Polygon) => {
        polygonRef.current = poly;
    }
    /////////////////////////////////////////// Return Componente //////////////////////////////////////////////////////////
    return isLoaded ? (
        <>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full lg:max-w-5xl flex-col mb-8'>
                <div className=' w-full flex justify-center'>
                        <label htmlFor="">Datos del predio</label>
                    </div>
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
                                            onLoad={(event) => onLoadPolygon(event)}
                                        />
                                    </>
                                </GoogleMap>
                            </div>
                            <div className=' w-1/2 lg:w-1/3 pl-5 pt-5 pr-5'>
                                <h1 className='text-lg text-principal'>Predio</h1>
                                <label className='mt-2 text-base text-principal block'>Nombre</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.nombre}
                                />
                                <label className='mt-2 text-base text-principal block'>Estado</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.estado}
                                />
                                <label className='mt-2 text-base text-principal block'>Municipio</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.municipio}
                                />
                            </div>
                            <div className=' w-1/2  lg:p-5 pt-5'>
                                <h1 className='text-lg text-principal'>Propietario</h1>
                                <label className='mt-2 text-base text-principal block'>Nombre</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.propietario.nombre}
                                />
                                <label className='mt-2 text-base text-principal block'>Telefono</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.propietario.telefono}
                                />
                                <label className='mt-2 text-base text-principal block'>eMail</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.propietario.email}
                                />
                            </div>
                            <div className=' w-1/2 lg:p-5 mt-4'>
                                <div className='flex items-center justify-center'>
                                    <div className='mr-5'>
                                        <GpsIcon/>
                                    </div>
                                    <label className=' text-base text-principal block'>Coordenadas del predio</label>
                                </div>
                                <textarea id='taCoordenadas' className='w-full rounded-lg border-1 border-principal text-secundary text-sm mt-4'
                                    rows={5} value={JSON.stringify(predio.coordenadas)} required/>
                                <label className='mt-2 text-base text-principal block'>Extension en Has.</label>
                                <input type="text" id='Has' className=' rounded-lg border-1 border-principal text-secundary w-full'
                                    value={predio.extension}
                                />
                            </div>
                        </div>
                </div>
            </div>
        </>
    ) : <></>
}

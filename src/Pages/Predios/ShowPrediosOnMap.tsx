import { useContext, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { GoogleMap, useJsApiLoader, DrawingManager, Polygon } from '@react-google-maps/api'

import '../../App.css'
import { MyContext } from '../../Context/context'
import { Predio } from '../../Common/PredioTypes'
import { DataPredio } from '../../Components/DataPredio'

export default function ShowPrediosOnMap() {
    const contexto = useContext(MyContext)
    const location = useLocation()
    const predios = useState<Predio[]>(location.state.predios)
    const [predio, setPredio] = useState<Predio>(location.state.predios[0])
    const [showDataPredio, setShowDataPredio] = useState<boolean>(false)
    ////////////////////////////////////////////////////////////Mapa////////////////////////////////////////////////////////
    const [mapZoom, setMapZoom] = useState(14)
    const [mapCenter] = useState(predio?.coordenadas[0])
    const mapRef = useRef<google.maps.Map | null>(null);
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
    const onLoadPolygon = (poly: google.maps.Polygon) => {
        polygonRef.current = poly;
    }
    /////////////////////////////////////////// Return Componente //////////////////////////////////////////////////////////
    return isLoaded ? (
        <>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full lg:max-w-5xl flex-col mb-8'>
                    <div className='w-full flex flex-wrap justify-around p-5'>
                        <div id="map1" className='w-full h-96 bg-gray-100 rounded-lg shadow-lg'>
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
                                        options={drawingManagerOptions}
                                    />
                                    {
                                        predios[0].map((predio: Predio) => {
                                            return (
                                                <Polygon
                                                    key={predio._id}
                                                    options={polygonOptions}
                                                    paths={predio.coordenadas}
                                                    onLoad={(event) => onLoadPolygon(event)}
                                                    onClick={() => {
                                                        setPredio(predio)
                                                        setShowDataPredio(true)
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </>
                            </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
            <DataPredio show={showDataPredio} setShow={setShowDataPredio} predio={predio}/>
        </>
    ) : <></>
}

import '../App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { useContext, useState } from 'react'

import { MyContext } from '../Context/context'
import Layout from '../Components/Layout'
import Home from './Home'
import Login from './Login'
import CreateUser from './CreateUser'
import Cultivos from './Cultivos'
import PrediosAdmin from './Predios/PrediosAdmin'
import PrediosUser from './Predios/PrediosUser'
import Usuarios from './Usuarios'
import Predio from './Predios/Predio'
import NewPredio from './Predios/NewPredio'
import EditPredio from './Predios/EditPredio'
import { createFirstUser } from '../Common/Users'
import { RejectConnectBD } from '../Components/Alerts';
import ShowPrediosAdmin from './Predios/ShowPrediosAdmin'
import ShowPrediosOnMap from './Predios/ShowPrediosOnMap'
import AsignarPredioCultivo from './Predios-Cultivo/AsignarPredioCultivo'
import MisDatos from './MisDatos'

const AppRoutesAdminUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/home', element: <Home />},
        { path: '/cultivos', element: <Cultivos />},
        { path: '/predios', element: <PrediosAdmin />,
            children: [
                { path: 'showPredios', element: <ShowPrediosAdmin />},
                { path: 'showPrediosOnMap', element: <ShowPrediosOnMap />},
                { path: 'newPredio', element: <NewPredio />},
                { path: 'editPredio', element: <EditPredio />},
                { path: 'predio', element: <Predio />}
            ]
        },
        { path: '/asignarPredioCultivo', element: <AsignarPredioCultivo />},
        { path: '/usuarios', element: <Usuarios />},
        { path: '/misDatos', element: <MisDatos />}
    ])
    return routes
}

const AppRoutesNormalUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/home', element: <Home />},
        { path: '/cultivos', element: <Cultivos />},
        { path: '/misDatos', element: <MisDatos />},
        { path: '/predios', element: <PrediosUser />,
            children: [
                { path: 'predio', element: <Predio />},
            ]
        }            
    ])
    return routes
}

const AppRoutesWithoutUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/home', element: <Home />},
        { path: '/login', element: <Login />},
        { path: '/createUser', element: <CreateUser />}
    ])
    return routes
}

export default function App() {
    const [showErrorBD, setShowErrorBD] = useState(false)
    const contexto = useContext(MyContext)
    createFirstUser().then((res)=>{
        if (res==='Error') setShowErrorBD(true)
    })
    function enrutar(){
        if (contexto?.data.user===null) {
                return <AppRoutesWithoutUser />
        } else {
            if (contexto?.data?.user?.rol==='Administrador')
                return <AppRoutesAdminUser />
            else
                return <AppRoutesNormalUser />
        }
    }
    return (
        <>
            <BrowserRouter>
                <Layout>
                    {
                        enrutar() 
                    }
                </Layout>
            </BrowserRouter>
            <RejectConnectBD show={showErrorBD} title='Error' text='Error al intentar conectarse a la BD de usuarios' setShow={setShowErrorBD}/>
        </>
    )
}
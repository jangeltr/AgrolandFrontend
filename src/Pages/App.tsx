import '../App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { useContext } from 'react';

import { MyContext } from '../Context/context';
import Layout from '../Components/Layout'
import Home from './Home';
import Login from './Login';
import CreateUser from './CreateUser';
import Cultivos from './Cultivos';
import Predios from './Predios';
import Usuarios from './Usuarios';
import Otros from './Otros';
import { createFirstUser } from '../Common/Users';

const AppRoutesAdminUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/home', element: <Home />},
        { path: '/cultivos', element: <Cultivos />},
        { path: '/predios', element: <Predios />},
        { path: '/usuarios', element: <Usuarios />},
        { path: '/otros', element: <Otros />}
    ])
    return routes
}

const AppRoutesNormalUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/home', element: <Home />},
        { path: '/cultivos', element: <Cultivos />},
        { path: '/predios', element: <Predios />}
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
    (async ()=> await createFirstUser())()
    const contexto = useContext(MyContext)
    function enrutar(){
        if (contexto?.data.user===null) {
                return <AppRoutesWithoutUser />
        } else {
            if (contexto?.data?.user?.rol==='Cliente')
                return <AppRoutesNormalUser />
            else
                return <AppRoutesAdminUser />
        }
    }
    return (
        <>
            <BrowserRouter>
                <Layout>
                    {enrutar()}
                </Layout>
            </BrowserRouter>
        </>
    )
}
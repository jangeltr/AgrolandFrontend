import '../App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { useContext } from 'react';

import { MyContext } from '../Context/context';
import Layout from '../Components/Layout'
import Home from './Home';
import Login from './Login';
import CreateUser from './CreateUser';

const AppRoutesAdminUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
    ])
    return routes
}

const AppRoutesNormalUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
    ])
    return routes
}

const AppRoutesWithoutUser = () => {
    const routes = useRoutes([
        { path: '/', element: <Home />},
        { path: '/login', element: <Login />},
        { path: '/createUser', element: <CreateUser />}
    ])
    return routes
}

export default function App() {
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
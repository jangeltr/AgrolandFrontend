import '../App.css'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { useContext } from 'react';

import { MyContext } from '../Context/context';
import Layout from '../Components/Layout'
import { Home } from './Home';

const AppRoutesAdminUser = () => {
    const routes = useRoutes([

    ])
    return routes
}

const AppRoutesNormalUser = () => {
    const routes = useRoutes([

    ])
    return routes
}

const AppRoutesWithoutUser = () => {
    const routes = useRoutes([

    ])
    return routes
}

function App() {
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
                        <Home />
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App
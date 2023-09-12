import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import './index.css'
import { MyContextProvider } from './Context/context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MyContextProvider>
        <App />
    </MyContextProvider>,
)

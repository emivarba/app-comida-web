import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import '../scss.d.ts'
import '../vite-env.d.ts'
import './styles/main.scss'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from './app/store.ts'

const rootElement = document.getElementById('root');

if(rootElement) {
    createRoot(rootElement).render(
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StrictMode>
        </Provider>,
    )
}else{
    console.log('No se ha encontrado el contenedor raíz')
}


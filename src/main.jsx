import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './styles/main.scss'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </Provider>,
)

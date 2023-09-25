import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./store";
import {
    BrowserRouter,
} from 'react-router-dom';
import Auth from "./components/Auth/Auth";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Auth>
                <App/>
            </Auth>
        </BrowserRouter>
    </Provider>
);

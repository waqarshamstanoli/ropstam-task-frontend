import React from "react"; 
import ReactDOM from "react-dom/client"; 
import axios from 'axios' 
import "./index.css"; 
import App from "./App"; 
import setupAxios from "./services/SetupAxios"; 
import { Provider } from "react-redux"; 
import { store } from './store/store'; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import {AuthContextProvider} from "./context/AuthContext"; 
const root = ReactDOM.createRoot(document.getElementById("root")); 
 
setupAxios(axios); 
root.render( 
    <React.StrictMode> 
            <Provider store={store}> 
                    <AuthContextProvider> 
                            <ToastContainer 
                                bodyClassName="toast__container" 
                                toastClassName="toast__container" 
                                closeButton={false} 
                                hideProgressBar 
                            /> 
                            <App /> 
                    </AuthContextProvider> 
            </Provider> 
    </React.StrictMode> 
); 
  
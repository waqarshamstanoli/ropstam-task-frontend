import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Main from "./layout/Main"; 
import AuthLayout from "./layout/AuthLayout";  
import Register from "./pages/Auth/Register";
import Home from "./components/Home"; 
import Auth from "./pages/Auth/Auth" 
import Cars from "./pages/Cars"; 
import Categories from "./pages/Categories"; 
import Dashboard from "./pages/Dashboard"; 
import "./App.css"; 
 
const App = () => { 
 
    return ( 
        <Router> 
            <Routes> 
                <Route path='/login' exact element={<Auth/>} /> 
                <Route path='/register' exact element={<Register/>} />
                <Route path='/' exact element={<Main/>} >
                    <Route path='/'  element={<Home/>} />
                </Route>

                <Route path='/' exact element={<AuthLayout/>} >
                    <Route path='/cars' exact  element={<Cars/>} />
                    <Route path='/categories' exact  element={<Categories/>} />
                    <Route path='/dashboard' exact  element={<Dashboard/>} />
                </Route>
            </Routes>
        </Router> 
    );
}

export default App;

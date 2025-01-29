import React, {createContext, useContext, useState, useEffect} from "react";  
import {configEnv} from "../config/configEnv";  
import {logoutUser} from "../api";  

const AuthContext = createContext();  
  
export const AuthContextProvider = ({children}) => {  
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const saveUser = (user) => { 
        localStorage.setItem(configEnv.AUTH_USER_OBJ, user); 
        setUser(user); 
    } 
 
     const saveAuthToken = (token) => {
         localStorage.setItem(configEnv.AUTH_ACCESS_TOKEN_KEY, token);
     }
 
     const logout = async () => {
         try {
             await logoutUser();
         }
         catch (e) {}
         finally {
             localStorage.removeItem(configEnv.AUTH_ACCESS_TOKEN_KEY);
             localStorage.removeItem(configEnv.AUTH_USER_OBJ);
             window.location.replace("/login");
        }   
    } 
 
     useEffect(() => {
         const getAuthUser = () => {
             let userStr = localStorage.getItem(configEnv.AUTH_USER_OBJ);
             if (userStr !== null) {
                 const parsedUser = userStr;
                 setUser((prevUser) => {
                     // Avoid redundant updates if the user is the same
                     if (prevUser === parsedUser) {
                         return prevUser;
                     }
                     return parsedUser;
                 });
            } 
             setLoading(false);
        }; 
        getAuthUser();
    }, []); // Empty dependency array ensures the effect runs only once
     
 
     return (
         <AuthContext.Provider value={{user, saveUser, saveAuthToken, logout}}>
             {loading ? <></> : <>{children}</>}
         </AuthContext.Provider>
    ); 
} 

export const useAuthContext = () => useContext(AuthContext); 

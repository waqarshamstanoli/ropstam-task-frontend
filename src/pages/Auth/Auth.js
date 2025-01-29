import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login"
import {useAuthContext} from "../../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  
  useEffect(() => {
    const verifyAuthUser = () => {
      if (user) {
        navigate("/dashboard");
      }
    }
    verifyAuthUser();
  }, [user]);


  return (
            <div className="w-full  rounded-lg">
            
             
                
                      <Login/>
                      
                  
            
            </div>
         
  );
}

export default Auth;

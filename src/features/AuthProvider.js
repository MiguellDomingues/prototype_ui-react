
import {useRef, useEffect,createContext } from "react";

import React from 'react'

import { auth } from '../utils/API/auth'
import { configs } from '../utils/API/configs'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = React.useState(null);

    const [config, setConfig] = React.useState(null);

    const { startSession, registerUser, endSession } = auth
    const { fetchClientConfigs } = configs

    const [loading, setLoading] = React.useState(true);

///////////////TEMP FETCHING CONFIGS HERE ///////////////////////////////

    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    const success = (configs) => {

      console.log("CONFIG OBJECT: ", configs)
      setConfig(configs); 
    }

    const failure = (r) => {
      console.log("error FETCH CONFIG", r.reason) 
      setConfig(r);    
    }

    const finish = (r) => {
      console.log("FINISH CONFIG")
      setLoading(false)
    }

    useEffect( () => {

        /* this is the pattern utilized for all async calls in functional components 
        prevents useEffect() from firing twice on init */
          if(dataFetchedRef.current) return
 
          const dataFetch = async () => {     
            await fetchClientConfigs(null).then(success, failure).finally(finish)  
          };
  
          dataFetchedRef.current = true;
          dataFetch();
      }, );

      //////////////TEMP FETCHING CONFIGS HERE ///////////////////////////////END

    /* PUBLIC FUNCTIONS */
    const handleLogin = async (request, callback) => { 
      const auth_path = `${config.DOMAIN}${config.ENDPOINT_URL_AUTH}`  
      await startSession(request,auth_path).then(setToken, callback) 
    };
  
    const handleLogout = () => {
      console.log("handle logout")
      //endSession()...
      setToken(null);
    };
  
    const handleRegistration  = async (request, callback) => {
      console.log("handle regis: ", request)
      const register_path = `${config.DOMAIN}${config.ENDPOINT_URL_REGISTER}`
      await registerUser(request,register_path).then(setToken, callback)
    };

    const value = {
      token,
      config,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onRegistration: handleRegistration
    };
  
    console.log("auth provider:", value)
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const useConfig = () => {
  return React.useContext(AuthContext);
};


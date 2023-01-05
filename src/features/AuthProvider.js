
import {useRef, useEffect } from "react";

import React from 'react'

import { POST } from '../utils/API/POST'
import { GET } from '../utils/API/GET'

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = React.useState(null);

    const [config, setConfig] = React.useState(null);

    const { startSession, registerUser, endSession } = POST
    const { fetchClientConfigs } = GET

    const [loading, setLoading] = React.useState(true);

///////////////TEMP FETCHING CONFIGS HERE ///////////////////////////////


    /* arr of filtered posts to be displayed in list */
    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    const success = (r) => {
      console.log("CONFIG OBJECT: ", r)
      setConfig(r); 
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
      //await fakeAuth(true, request).then(setToken, callback)  
      await startSession(request).then(setToken, callback) 
    };
  
    const handleLogout = () => {
      console.log("handle logout")
      //endSession()...
      setToken(null);
    };
  
    const handleRegistration  = async (request, callback) => {
      console.log("handle regis: ", request)
      await registerUser(request).then(setToken, callback)
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


import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'
import React from "react";

/*
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

    const { startSession, registerUser, endSession } = API

     const value = {
      token,
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

*/
const GuestPageContext = React.createContext(null);

export const GuestContextProvider = ( { children } ) =>{

    const { onFetch } = useAPI()

    const [data, setData] = useState();
    
    /* UI state */
    const [loading, setLoading] = useState(true);

    /* track the id of the selected entity to update map/list*/
    const [selected, setSelected] = useState();

    /* track the icon names of the selected filters */
    const [filters, setFilters] = useState([]);

    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    const success = (r) => {
      console.log("setposts GP: ", r)
      setData(r);    
    }

    const failure = (r) => {
      console.log("error GP", r.reason) 
      setData(r);  
    }

    const finish = (r) => {
      console.log("setloading GP")
      setLoading(false)
    }



    const handleSelectedLocation = (e, id) => {
      console.log("select location GP: ", id)
      setSelected(id)
    }

    const handleSelectedFilter = (iconName) => {
      return (e) => {
        console.log("select FILTER GP: ", iconName)
        //setSelected(id)
    }}

    useEffect( () => {
        
      /* this is the pattern utilized for all async calls in functional components */
        if(dataFetchedRef.current) return

        const dataFetch = async () => {     
          onFetch(success, failure, finish)
        };

        dataFetchedRef.current = true;
        dataFetch();
        //onFetch();

        //add cleanup code for the handler? (like gmaps does)
    }, );

    const value = {
        data, loading, selected, filters,
        handleSelectedLocation: handleSelectedLocation,
        handleSelectedFilter: handleSelectedFilter,
    };

    return (
        <GuestPageContext.Provider value={value}>
          {children}
        </GuestPageContext.Provider>
      );
}

export const useGuestContext = () => {
    return React.useContext(GuestPageContext);
  };



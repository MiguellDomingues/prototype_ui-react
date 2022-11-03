import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'
import React from "react";

const DataContext = React.createContext(null);

export const DataContextProvider = ( {children} ) =>{

  console.log("//////////////////////DataContextProvider///////////////////////////")

    const { onFetch } = useAPI()

    /* primarly JSON returned from callout */
    const [data, setData] = useState();

     /* callout status, t for success, f for failure */
    const [status, setStatus] = useState(undefined)

    /* copy of data from callout */
    const [posts, setPosts] = useState(undefined);
    
    /* UI state */
    const [loading, setLoading] = useState(true);

    /* arr of filtered posts to be displayed in list */
    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

   
    const success = (r) => {
      console.log("setposts UP: ", r)
      setData(r); 
      
      //setFilteredPosts(r.posts)
      //here i could do another callout to fetch appointments for a  location    
    }

    const failure = (r) => {
      console.log("error UP", r.reason) 
      setData(r);  
    }

    const finish = (r) => {
      console.log("setloading UP")
      setLoading(false)
    }

    useEffect( () => {
        
        /* this is the pattern utilized for all async calls in functional components 
        prevents useEffect() from firing twice on init */
          if(dataFetchedRef.current) return
  
          const dataFetch = async () => {     
            onFetch(success, failure, finish)
          };
  
          dataFetchedRef.current = true;
          dataFetch();
          //onFetch();
  
          //add cleanup code for the handler? (like gmaps does)
      }, );

    const value ={
      data, status, posts, loading
    }


    return(
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
    );
}

export const useDataContext = () => {
    return React.useContext(DataContext);
};
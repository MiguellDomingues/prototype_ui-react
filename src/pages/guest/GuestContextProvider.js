import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'
import React from "react";

const GuestContext = React.createContext(null);

export const GuestContextProvider = ( { children } ) =>{

    const { onFetch } = useAPI()

    /* primarly JSON returned from callout */
    const [data, setData] = useState();
    
    /* UI state */
    const [loading, setLoading] = useState(true);

    /* track the id of the selected entity to update map/list*/
    const [selected, setSelected] = useState();

    /* arr of filtered posts to be displayed in list */
    const [filteredPosts, setFilteredPosts] = useState([])

    //console.log("filteredPosts: ", filteredPosts)

    /* arr of selected filters */
    const [filters, setFilters] = useState([]);

    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    /***************************** API CALLBACKS *******************************************/

    const success = (r) => {
      console.log("setposts GP: ", r)
      setData(r); 
      setFilteredPosts(r.posts)     
    }

    const failure = (r) => {
      console.log("error GP", r.reason) 
      setData(r);  
    }

    const finish = (r) => {
      console.log("setloading GP")
      setLoading(false)
    }

    /******************************************************************************************/

     /***************************** CLICKING ON MAP MARKERS/LIST ITEMS CALLBACK  *******************************************/
    const selectLocation = (e, id) => {
      //e.preventDefault();
      console.log("select location GP: ", id)
      setSelected(id)
    }
    /******************************************************************************************/

    /***************************** CLICKING ON FILTERS  *******************************************/

    const selectFilter = (iconName) => {
      return (e) => {
        e.preventDefault();
        console.log("select FILTER GP: ", iconName, filters)
        const copyFilters = [...filters].concat( [iconName] )
       updateFilters (copyFilters)
    }}

    const deSelectFilter = (iconName) => {
      return (e) => {
        e.preventDefault();
        console.log("deselect FILTER GP: ", iconName, filters)
        const copyFilters = [...filters.filter( (element) => {return element !== iconName} )]
        updateFilters (copyFilters)
    }}

    const updateFilters = (updatedFilters) => {

      // A AND B AND C.. filter for tags/icons
      /* this peice of code sais:
          for EACH post p:
            is every string within updatedFilters included in p.icons string array ? (thats what arr.every(..) does)
      */
     //the output is a list of posts with icons that contains all the entries in filters
      setFilteredPosts(data.posts.filter( (post) => updatedFilters.every( (filterName) => post.icons.includes(filterName) ) ))
      //batch update both the new filters and the filtered list
      setFilters(updatedFilters)
    }

     /******************************************************************************************/

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
        data, loading, selected, filters, filteredPosts,
        handleSelectedLocation: selectLocation,
        handleSelectFilter : selectFilter ,
        handleDeselectFilter : deSelectFilter,
    };

    return (
        <GuestContext.Provider value={value}>
          {children}
        </GuestContext.Provider>
      );
}

export const useGuestContext = () => {
    return React.useContext(GuestContext);
  };



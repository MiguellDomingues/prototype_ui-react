import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'
import React from "react";

const UserContext = React.createContext(null);

export const UserContextProvider = ( { children } ) =>{

    const { onFetch } = useAPI()

    /* primarly JSON returned from callout */
    const [data, setData] = useState();

     /* callout status, t for success, f for failure */
    const [status, setStatus] = useState(undefined)

    /* copy of data from callout */
    const [posts, setPosts] = useState(undefined);
    
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

    /////////////////////// USER CONTEXT SPECIFIC STATE /////////////////////////////

    /* arr of appointments connected to the location id*/
    const [appointments, setAppointments] = useState([]);

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    /***************************** API CALLBACKS *******************************************/

    const success = (r) => {
      console.log("setposts UP: ", r)
      setData(r); 
      /** */
      setFilteredPosts(r.posts)
      /******************************************** */
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

    /******************************************************************************************/

     /***************************** CLICKING ON MAP MARKERS/LIST ITEMS CALLBACK  *******************************************/
    const selectLocation = (e, id) => {
      //e.preventDefault();
      console.log("select location GP: ", id)
      setSelected(id)
      // when user clicks on a location, set the appointments array
      selectLocationAppointments(id)
      //.. and erase the current selected appointment
      setSelectedAppointment()
    }

    //HELPER FUNCTION THAT READS THE APPOINTMENTS ON THE DATA.POSTS object
    const selectLocationAppointments = (id) => {

      //this line is using array.find() to return the post object with id equal to passed in id, then reading the appointments array
      const appts = data.posts.find( (post) => {return post.id === id} ).appointments
      setAppointments(appts)
    }

    const selectAppointment = (id) => {
      return (e) => {
        e.preventDefault();
        console.log("select APPOINTMENT: ", id)
        setSelectedAppointment(id)
    }}
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

    
    const value = {
        // GUEST AND USER CONTEXT
        data, loading, selected, filteredPosts, filters ,
        handleSelectedLocation: selectLocation,
        handleSelectFilter : selectFilter ,
        handleDeselectFilter : deSelectFilter,
        // USER CONTEXT ONLY
        appointments, selectedAppointment,
        handleSelectAppointment: selectAppointment,
    };
    

    /*
    const contextData = {
      data,
      loading,
      status,
      posts,
    }

    const contextShared = {
      selected,  
      handleSelectedLocation: selectLocation, // this handler gets consumed on 2 views 
      setSelected, // these setters should have wrappers to prevent bad inputs from producers
      // dependencies/ updating state of other components
      selectLocationAppointments,
      setSelectedAppointment,
    }

    const contextAppointment = {
      appointments, selectedAppointment,
      handleSelectAppointment: selectAppointment,
    }

    const contextFilters = {
      filters, filteredPosts,
      handleSelectFilter : selectFilter ,
      handleDeselectFilter : deSelectFilter,
    }

    const value = {
      contextData, //// pass this to the map/location list
      contextShared, //  pass this to map/location list
      contextAppointment, //pass this to the appt list
      contextFilters //pass this to the filters list
  };
*/
    return (
        <UserContext.Provider value={value}>
          {children}
        </UserContext.Provider>
      );
}

export const useUserContext = () => {
    return React.useContext(UserContext);
  };



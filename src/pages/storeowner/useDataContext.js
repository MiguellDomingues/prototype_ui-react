import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'

export const useDataContext= (selectLocation) =>{

    const { fetchLocationsStoreOwner } = useAPI()

    /* primarly JSON returned from callout */
    const [data, setData] = useState();

     
    /* UI state */
    const [loading, setLoading] = useState(true);

    /* arr of filtered posts to be displayed in list */
    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    const success = (r) => {
      console.log("setposts UP: ", r)
      setData(r); 
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
            fetchLocationsStoreOwner(success, failure, finish)
          };
  
          dataFetchedRef.current = true;
          dataFetch();
      }, );

      const editLocation = (location) => {
        
        const edit_index = data.posts.indexOf(data.posts.find( (loc) =>  location.id === loc.id))         //get index of editted location using id
        data.posts[edit_index] = {...location, appointments: [...data.posts[edit_index].appointments] }   //edit the location object and copy the appointments
        setData({...data, posts: data.posts})                                                             //declare a new object with old object references, triggering rerender
      }

      const addLocation = (location) => {
        data.posts.push(location)
        setData({...data, posts: data.posts})
      }

      const removeLocation = (location_id) => {

        let copy = []
        // location_id !== loc.id && .... is shorthand for if(...){ ... }
        data.posts.forEach( (loc) => location_id !== loc.id &&                                             //for each location except for the deleted one..
          copy.push( {...loc, appointments: [...loc.appointments]} ) )                                     //deep copy the location and location appointments into a new array

        selectLocation(undefined)                                                                          //unset the currently selected location, since its removed from the location array                                                                                   
        setData({...data, posts: copy}); 
      }

      const editAppointmentStatus = (location_id, appointment_id, new_status) =>{

        data.posts.find( (loc) => loc.id === location_id )                                                 // find location object by id            
          .appointments.find( (apt) => apt.id === appointment_id )                                         // find the location appointment by id
            .status = new_status                                                                           // update the status

        setData({...data, posts: data.posts}); 
      }

  return [
    data, loading,
    {editLocation, addLocation, removeLocation, editAppointmentStatus},
  ]; 

}



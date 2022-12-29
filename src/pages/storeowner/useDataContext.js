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
          //onFetch();
  
          //add cleanup code for the handler? (like gmaps does)
      }, );

      const editLocation = (location) => {
        
        //get index of editted location using id
        const edit_index = data.posts.indexOf(data.posts.find( (loc) =>  location.id === loc.id))

        //edit the location object
        data.posts[edit_index] = {...location, appointments: [...data.posts[edit_index].appointments] }

        //declare a new object with old object references, triggering rerender
        setData({...data, posts: data.posts})
      }

      const addLocation = (location) => {
        console.log("add location to root data: ", location)

        data.posts.push(location)

        setData({...data, posts: data.posts})
      }


      const removeLocation = (location_id) => {

        let copy = []

        // deep copy the locations into new array 'copy', except for the deleted one
        // location_id !== loc.id && .... is shorthand for if(...){ ... }
        data.posts.forEach( (loc) => location_id !== loc.id && copy.push( {...loc, appointments: [...loc.appointments]} ) )

        // deselect the currently selected location, since it's been removed from the list
        selectLocation(undefined)
        setData({...data, posts: copy}); 
      }

  return [
    data, loading,
    {editLocation, addLocation, removeLocation},
  ]; 

}



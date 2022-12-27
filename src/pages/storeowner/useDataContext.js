import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'

export const useDataContext= () =>{

  //console.log("//////////////////////DataContextProvider///////////////////////////")

    const { fetchLocationsStoreOwner } = useAPI()

    /* primarly JSON returned from callout */
    const [data, setData] = useState();

     /* callout status, undefined for init, t for success, f for failure */
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
      setPosts(r.posts)
      setStatus(true)
      //initFilter(r.posts, [])
      
      //setFilteredPosts(r.posts)
      //here i could do another callout to fetch appointments for a  location    
    }

    const failure = (r) => {
      console.log("error UP", r.reason) 
      setData(r); 
      setPosts([])
      setStatus(false)
       
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
        
        console.log("edit location in data context: ", location)

        //get index of editted location using id
        const edit_index = data.posts.indexOf(data.posts.find( (loc) =>  location.id === loc.id))

        //edit the location object
        data.posts[edit_index] = {
          ...location,
          //LatLng: {lat: 63 , lng: -1 }, // just add a diff constant lat/lng; later randomize the lat/lng by +1/-1 each entry
          appointments: [...data.posts[edit_index].appointments]
        }

        //declare a new object with old object references, triggering rerender
        setData({...data, posts: data.posts})
      }

      const addLocation = (location) => {
        console.log("add location to root data: ", location)

        data.posts.push(location)

        setData({...data, posts: data.posts})
      }

      const removeLocation = (location_id) => {
        console.log("delete location: ", location_id)
      }

      const addAppointment = (appointment, loc_id) =>{
        console.log("add appointment", appointment)
        console.log("loc_id", loc_id)

        const appended = data.posts.map( 
          (post )=> {
            if(post.id === loc_id){post.appointments.push(appointment)}
            return post
          })

          //console.log("new posts: ", appended)

         // console.log("new data: ", {success: true, posts: appended})

          setData({success: true, posts: appended}); 
          setPosts(appended)       
      }

      const removeAppointment = (loc_id, apt_id) => {

        console.log("removeApt: ", loc_id, apt_id)

        const removed = data.posts.map(
          (post) =>{
            if(post.id === loc_id){post.appointments = post.appointments.filter((appointment)=>appointment.id !== apt_id)}
            return post
          }
        )

        console.log("cancel apot data: ", removed)
      
          setData({success: true, posts: removed}); 
          setPosts(removed)
      }

      
    

  return [
    data, 
    loading,posts,status,
    {addAppointment, removeAppointment,editLocation, addLocation, removeLocation},
  ]; 

}



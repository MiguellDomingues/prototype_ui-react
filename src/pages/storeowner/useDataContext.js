import {useState, useEffect, useRef} from 'react'
import { useAPI } from '../../features/DataProvider'

export const useDataContext= ( initFilter) =>{

  console.log("//////////////////////DataContextProvider///////////////////////////")

    const { onFetchLocations } = useAPI()

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
            onFetchLocations(success, failure, finish)
          };
  
          dataFetchedRef.current = true;
          dataFetch();
          //onFetch();
  
          //add cleanup code for the handler? (like gmaps does)
      }, );

      const addAppointment = (appointment, loc_id) =>{
        console.log("add appointment", appointment)
        console.log("loc_id", loc_id)

        const appended = data.posts.map( 
          (post )=> {
            if(post.id === loc_id){post.appointments.push(appointment)}
            return post
          } )

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
        /*
        for each location:
          if location.id = loc_id
            for each location appointment:
              if appointment.id != apt_id: 
                copy appointment    
        */

          setData({success: true, posts: removed}); 
          setPosts(removed)
      }

      //console.log("//////////////data context: /////////////////")
     // console.log("data: ", data)
     // console.log("loading: ", loading)
     // console.log("//////////////////////////////////////////")
      
  return [
    data, 
    loading,posts,status,
    {addAppointment,removeAppointment},
  ]; 

}

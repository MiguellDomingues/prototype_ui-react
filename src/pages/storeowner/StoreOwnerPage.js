
import  {useState } from 'react'

import { useDataContext  } from './useDataContext'

import LocationList from './ui/locationList/LocationList'
import MyMap from './ui/map/Map.tsx'
import AppointmentList from './ui/appointmentList/AppointmentList'

import './storeownerpage.css'

function StoreOwnerPage() {

    const [selectedLocation, setSelectedLocation] = useState()

    const selectLocation = (location_id) => {
      setSelectedLocation(location_id)
    }

    const [
      data, 
      loading,
      {
        editLocation, 
        addLocation, 
        removeLocation,
        editAppointmentStatus
      }
   ] = useDataContext(selectLocation)

    function getPosts(data){
      return data && data.posts ? data.posts : [];
    }

    const map_deps ={
      posts: getPosts(data), 
      selectedLocation,
      selectLocation
    }

    const locations_deps = { 
      posts: getPosts(data),
      data,
      loading, 
      selectedLocation,
      //selectLocation,
      handlers: { editLocation, addLocation, removeLocation, selectLocation }   
    }

    const appt_deps = {
      selectedLocation,
      posts: getPosts(data), 
      handlers: { editAppointmentStatus }
    }

   return (<>

      <div className="guestpage_container">
         
        <div className="map_container col">
          <MyMap context={ map_deps } />
        </div>
        
        <div className="right_container col">
               <div className="top_child_list row"> 
                  <LocationList context={ locations_deps }/>
               </div>
    
               <div className="bottom_child row">
                  <AppointmentList context = {appt_deps}/>
               </div>
         </div>
      
        </div>
     
      </>);
  }
  
  export default StoreOwnerPage;
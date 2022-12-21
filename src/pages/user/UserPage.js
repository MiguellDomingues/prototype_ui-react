/*
todo:
- add data for an auth user now
- displays in bottom right window
- same as guest user, except users get access to :
    setting/updating appointments at stores
    viewing all appointments?
    - make room in bottom left to see upcoming appointments?
    - or use another page?

- clean up header bar; add links to authed pages, like a profile
- change data fetching for diff users (user/storeowner/admin) into a GetContext hook
  - takes data from auth token, does a switch() on type to resolve user data
- put the diff callouts into a single module
- clean up file structure

- add a filter for the diff types
  - put in corner of list
  - 

- COMBINE AUTHPROVIDER AND DATA PROVIDER INTO SINGLE obj:
  - ContextProvider
    - stores the auth key AND the data for the UI
      - users list, profile, config, etc
*/

import  {useState } from 'react'


import { useDataContext  } from './useDataContext'
import {  useLocationFilter  } from './ui/locationFilter/useLocationFilter'

import LocationList from './ui/locationList/LocationList'
import LocationFilter from './ui/locationFilter/LocationFilter'
import MyMap from './ui/map/Map.tsx'
import AppointmentList from './ui/appointmentList/AppointmentList'

import './userpage.css'

  const UserPage = ( props ) =>{

    const [selectedLocation, setSelectedLocation] = useState()

    const selectLocation = (location_id) => {
      setSelectedLocation(location_id)
    }

    const resetLocation = () => {
      setSelectedLocation()
    }

    //console.log( "asdadaddsdas", useDataContext())
    const [data, loading,posts,status,{addAppointment,removeAppointment}] = useDataContext()
    const [filters, {selectFilter, deSelectFilter,applyFilters}] = useLocationFilter ()
    
   // console.log("//////////////user page: /////////////////")
   // console.log("data: ", data)
   // console.log("loading: ", loading)
   // console.log("posts: ", posts)
   // console.log("status: ", status)

    //console.log("filteredPosts: ", filteredPosts)
   // console.log("filters: ", filters)
    //console.log("appointments: ", appointments)
   // console.log("selectedLocation: ", selectedLocation)
  //  console.log("select Location: ", selectLocation)
    //console.log("showButton: ", showButton)
  //  console.log("/////////////////////////////////////////")

    function getPosts(data){
      return data && data.posts ? data.posts : [];
    }

    const map_deps ={
      posts: getPosts(data), 
      selectedLocation,
      selectLocation
    }

    const locations_deps = { 
      posts: applyFilters(getPosts(data), filters),
      data,
      loading, 
      selectedLocation,
      selectLocation,
    }

    const filters_deps = {
      loading, selectFilter, deSelectFilter , filters
    }

    const appt_deps = {
      selectedLocation,
      posts: getPosts(data), 
      addAppointment,
      removeAppointment
    }

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
        <MyMap context={ map_deps } />
      </div>
      
      <div className="right_container col">

        <div className="top_child_filter row">
          <LocationFilter context={ filters_deps } />
        </div>

        <div className="top_child_list row"> 
          <LocationList context={ locations_deps }/>
        </div>
        
        <div className="bottom_child row">
          <AppointmentList context = {appt_deps}/>
        </div>
    
      </div>

    </div>
    </>
      );
  }
  
  export default UserPage;

  
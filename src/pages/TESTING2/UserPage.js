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


import { useDataContext  } from './useDataContext'
import { useAppointmentContext  } from './useAppointmentContext'
import {  useFilterContext  } from './useFilterContext'
import { useLocationContext  } from './useLocationContext'


import LocationList from './UI/LocationList'
import LocationFilter from './UI/LocationFilter'
import MyMap from './UI/Map.tsx'
import AppointmentList from './UI/AppointmentList'

import './userpage.css'

  const UserPageTEST = ( props ) =>{

    console.log( "asdadaddsdas", useDataContext())

    
    const {data,loading} = useDataContext()
    const {filters, filteredPosts, 
      handleSelectFilter, 
      handleDeselectFilter } = useFilterContext(data)
      
    const { selectLocationAppointments, setSelectedAppointment, appointments } = useAppointmentContext(data)
    const { handleSelectedLocation, selected } = useLocationContext(selectLocationAppointments, setSelectedAppointment)

  
    //console.log("data ", data, "loading ", loading, "filteredposts ",filteredPosts, "selLoc ", selectLocationAppointments, setSelectedAppointment)
    

    const map_deps ={
      data, selected, handleSelectedLocation
    }

    const locations_deps = {
      data, loading, filteredPosts,handleSelectedLocation
    }

    const filters_deps = {
      loading, handleSelectFilter, handleDeselectFilter , filters
    }

    const appt_deps = {
      selectLocationAppointments, setSelectedAppointment, appointments
    }

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
        <MyMap context={ map_deps } />
      </div>
      
      <div className="right_container col">

        <div className="top_child_filter row">
          <LocationFilter context={ locations_deps } />
        </div>

        <div className="top_child_list row"> 
          <LocationList context={ filters_deps }/>
        </div>
        
        <div className="bottom_child row">
          <AppointmentList context = {appt_deps}/>
        </div>
    
      </div>

    </div>
    </>
      );
  }
  
  export default UserPageTEST;
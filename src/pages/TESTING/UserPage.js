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


import LocationList from './UI/LocationList'
import LocationFilter from './UI/LocationFilter'
import MyMap from './UI/Map.tsx'
import AppointmentList from './UI/AppointmentList'

//import { useUserContext } from './UserContextProvider'

import './userpage.css'

  const UserPageTEST = ( props ) =>{

    const { useDataContext, useAppointmentContext, useFilterContext, useLocationContext } = props.context

    const { data, loading } = useDataContext
    const { selected, handleSelectedLocation } = useLocationContext
    const { filteredPosts} = useFilterContext

    console.log("usepagetest: ", props)
    console.log("data/loading: ", data, loading)
    

    const map_deps ={
      data, selected, handleSelectedLocation
    }

    const locations_deps = {
      data, loading, filteredPosts
    }

    const filters_deps = {
      loading
    }

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
        <MyMap dependencies={ map_deps } />
      </div>
      
      <div className="right_container col">

        <div className="top_child_filter row">
          <LocationFilter dependencies={ [loading] } />
        </div>

        <div className="top_child_list row"> 
          <LocationList dependencies={ [data, loading, filteredPosts] }/>
        </div>
        
        <div className="bottom_child row">
          <AppointmentList/>
        </div>
    
      </div>

    </div>
    </>
      );
  }
  
  export default UserPageTEST;
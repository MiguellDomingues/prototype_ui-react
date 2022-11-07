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

import { useAppointmentList  } from '../../ui/hooks/useAppointmentList'
import {  useLocationFilter  } from '../../ui/hooks/useLocationFilter'
import { useLocationList  } from '../../ui/hooks/useLocationList'


import LocationList from '../../ui/LocationList'
import LocationFilter from '../../ui/LocationFilter'
import MyMap from '../../ui/Map.tsx'
import AppointmentList from '../../ui/AppointmentList'

import { InfinitySpin } from 'react-loader-spinner'

import './userpage.css'

  const UserPageTEST = ( props ) =>{

    //console.log( "asdadaddsdas", useDataContext())
    const [filteredPosts, filters, {selectFilter, deSelectFilter,initFilter}] = useLocationFilter ()
    const [data, loading,posts,status,{addAppointment}] = useDataContext(initFilter)
    
    const [appointments, selectedAppointment, showButton, {selectAppointment, selectLocationAppointments,toggleButton,resetAppointmentList} ] = useAppointmentList (data)

    const [ selected, {handleSelectedLocation} ] = useLocationList(selectLocationAppointments,resetAppointmentList)

    console.log("//////////////user page: /////////////////")
    console.log("data: ", data)
    console.log("loading: ", loading)
    console.log("data: ", posts)
    console.log("loading: ", status)

    console.log("filteredPosts: ", filteredPosts)
    console.log("filters: ", filters)
    console.log("appointments: ", appointments)
    console.log("selected: ", selected)
    console.log("showButton: ", showButton)
    console.log("/////////////////////////////////////////")

    function getPosts(data){
      return data && data.posts ? data.posts : [];
    }

    function getFilteredPosts(data, filteredPosts){
      return filteredPosts ? filteredPosts : getPosts(data) ;
    }


    const map_deps ={
      posts: getPosts(data), 
      selected, 
      handleSelectedLocation
    }

    //const filteredPosts = !props.context.filteredPosts ? data.posts : props.context.filteredPosts

    const locations_deps = { 
      posts: getFilteredPosts(data, filteredPosts),
      data,
      loading, 
      handleSelectedLocation, 
      selected
    }

    const filters_deps = {
      loading, selectFilter, deSelectFilter , filters
    }

    // { appointments, setSelectedAppointment, selectedAppointment }
    //{ appointments, setSelectedAppointment, selectedAppointment }

    const appt_deps = {
      selectAppointment, appointments, selectedAppointment, showButton, toggleButton, selected,addAppointment
    }

    /*
if(loading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }
    */

   // const getLoadingSpinner = () =>{
    //  return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
   // }


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
  
  export default UserPageTEST;
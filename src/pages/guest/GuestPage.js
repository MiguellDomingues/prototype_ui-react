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


import LocationList from '../../features/LocationList'
import LocationFilter from '../../features/LocationFilter'
import MyMap from '../../components/Map.tsx'
import { useGuestContext } from './GuestContextProvider'

import './guestpage.css'

  const GuestPage = () =>{

    const {data,
      loading,
      selected,
      filters,
      filteredPosts,
      handleSelectedLocation,
      handleSelectFilter,
      handleDeselectFilter,
    } = useGuestContext()

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
        <MyMap
          isLoading={loading}
          data={data} 
          selected={selected} 
          selectedLocationHandler={handleSelectedLocation}/>
      </div>
      
      <div className="right_container col">

        <div className="top_child_filter row">
          <LocationFilter
            filters= {filters}
            handleSelectFilter ={handleSelectFilter}
            handleDeselectFilter ={handleDeselectFilter}
            />
        </div>

        <div className="top_child_list row"> 
          <LocationList context={useGuestContext()}/>
        </div>
        
        <div className="bottom_child row">
          <p>
            <b>BOTTOM STUFF GUEST PAGE</b> (fills remaining space)
          </p>
          <p>
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
        </div>
    
      </div>

    </div>
    </>
      );
  }
  
  export default GuestPage;

  /* const { onFetch } = useAPI()

  
    const [data, setData] = useState();
    
  
    const [loading, setLoading] = useState(true);

   
    const [selected, setSelected] = useState();

  
    const [filters, setFilters] = useState([]);

  
    const dataFetchedRef = useRef(false);

    const success = (r) => {
      console.log("setposts GP: ", r)
      setData(r);    
    }

    const failure = (r) => {
      console.log("error GP", r.reason) 
      setData(r);  
    }

    const finish = (r) => {
      console.log("setloading GP")
      setLoading(false)
    }



    const handleSelectedLocation = (e, id) => {
      console.log("select location GP: ", id)
      setSelected(id)
    }

    const handleSelectedFilter = (iconName) => {
      return (e) => {
        console.log("select FILTER GP: ", iconName)
        //setSelected(id)
    }}
  */

 
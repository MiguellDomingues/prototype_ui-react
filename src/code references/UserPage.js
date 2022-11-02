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
*/

import {useState, useEffect, useRef} from 'react'
import LocationList from '../../features/LocationList'
import MyMap from '../../components/Map.tsx'
import  { fetchUserData } from '../../utils/fakeApi'

import './UserPage.css'

function UserPage(props) {
/*
   const [data, setData] = useState();
   const [loading, setLoading] = useState(true);
   const [selected, setSelected] = useState();

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

    useEffect( () => {
        
        if(dataFetchedRef.current) return

        const dataFetch = async () => {     
         fetchUserData(true, success, failure, finish)
        };

        dataFetchedRef.current = true;
        dataFetch();

        //add cleanup code for the handler? (like gmaps does)
    }, );

    

    const handleSelectedLocation = (e, id) => {
      console.log("select location GP: ", id)
      setSelected(id)
    }

    return (<>

    <div className="guestpage_container">

      <div className="map_container col">
        <MyMap
          //isLoading={loading}
          data={data} 
          selected={selected} 
          selectedLocationHandler={handleSelectedLocation}/>
      </div>
      
      <div className="right_container col">
        <div className="top_child row"> 
          <LocationList
            isLoading={loading}
            data={data} 
            selected={selected} 
            selectedLocationHandler={handleSelectedLocation} />
        </div>
        <div className="bottom_child row">
          <p>
            <b>BOTTOM STUFF USER PAGE</b> (fills remaining space)
          </p>
          <p>
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
        </div>

      </div>

    </div>

    </> );
    */

    return <>hello user page</>
  }
   
  export default UserPage;

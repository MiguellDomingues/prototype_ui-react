
import {useState, useEffect, useRef} from 'react'
import LocationList from '../../features/LocationList'
import MyMap from '../../components/Map.tsx'
import  { fetchProfileData } from '../../utils/fakeApi'

import './guestpage.css'

const GuestPage = () =>{

    /*  fetched data */
    const [data, setData] = useState();
    //const [reason, setReason] = useState();

    /* UI state */
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState();

    /* prevent the double useEffect call/double fetch() on first render */
    const dataFetchedRef = useRef(false);

    const success = (r) => {
      console.log("setposts GP: ", r)
      setData(r);    
    }

    const failure = (r) => {
      console.log("error GP", r.reason)
      //setReason(r.reason); 
      setData(r);  
    }

    const finish = (r) => {
      console.log("setloading GP")
      setLoading(false)
    }

    useEffect( () => {
        
        if(dataFetchedRef.current) return
        const dataFetch = async () => {     
          fetchProfileData(true, success, failure, finish)
        };
        dataFetchedRef.current = true;
        dataFetch();

        //console.log("useEffect in GP", data)
        
      
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
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
          <p>
            <b>BOTTOM STUFF</b> (fills remaining space)
          </p>
        </div>
      </div>

    </div>

    </> );
  }
  
  export default GuestPage;

 
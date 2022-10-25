import { useState, useEffect } from 'react'

import './LocationList.css'

import Location from '../components/Location'

import  { fetchProfileData } from '../utils/fakeApi' 



const LocationList = () =>{

    const [data, setData] = useState([]);
    const [reason, setReason] = useState();
    const [loading, setLoading] = useState(true);

    const c1 = (r) => {
        console.log("setposts: ", r)
        setData(r.posts);    
    }
    
    const c2 = (r) => {
       console.log("error", r.reason)
       setReason(r.reason); 
    }
    
    const c3 = (r) => {
        console.log("setloading")
        setLoading(false)
    }

    const handleClick = (e) => {
        //setReload(!reload)
        //resource = fetchProfileData(true);    
    }

    useEffect( () => {
        const dataFetch = async () => {
          fetchProfileData(true, c1, c2, c3)
        };
        dataFetch();
      }, []);

    const render = () =>{

        if(loading){
            return <>loading....</>
        }

        if(!reason){
            return <>
                {data.map( location => (
                <div className="list_child col display">           
                    <Location props={location}/>
                </div> )) }
            </>
        }else{
            return <p>load fail: {reason}</p>
        }
    }

    return (
    <>
        {render()}
    </>
    );  
}


/*

 <div className="list_container">
        { loading ? (!reason ? 
            data.map( location => (
                <div className="list_child col display">           
                    <Location props={location}/>
                </div> ))  
            : <p>load fail: {reason}</p> )
         : <>loading....</>}    
    </div>





const WrappedLocationList = ( { props }) =>{

    console.log("inner: ", resource)

    const {success, posts, reason} = resource.posts.read();

      return (<>     
        { success ? posts.map( location => (
            <div className="list_child col display">
               
                <Location props={location}/>
            </div>
        )) : <>
            <h1>{reason}</h1>
            <button onClick={props} name="status">Reload</button><br/>
                
        </>}
      </>)
}
*/
export default LocationList


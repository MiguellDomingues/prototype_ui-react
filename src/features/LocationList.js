import { useState, useEffect, useRef } from 'react'

import './LocationList.css'

import LocationWidget from '../components/LocationWidget'

import  { fetchProfileData } from '../utils/fakeApi'

import { InfinitySpin } from 'react-loader-spinner'



const LocationList = () =>{

    const [data, setData] = useState([]);
    const [reason, setReason] = useState();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(-1);

    const dataFetchedRef = useRef(false);

    const success = (r) => {
        console.log("setposts: ", r)
        setData(r.posts);    
    }
    
    const failure = (r) => {
       console.log("error", r.reason)
       setReason(r.reason); 
    }
    
    const finish = (r) => {
        console.log("setloading")
        setLoading(false)
    }

    const handleClick = (e) => {
        //setReload(!reload)
        //resource = fetchProfileData(true);    
    }

    useEffect( () => {
        if(dataFetchedRef.current) return
        const dataFetch = async () => {     
          fetchProfileData(true, success, failure, finish)
        };
        dataFetchedRef.current = true;
        dataFetch();
        console.log("useEffect in LL", data)
      }, []);

    const handleSelectedLocation = (e, id) => {

       // console.log("sdfsfds", id, e)
        setSelected(id)
    }

    const render = () =>{

        console.log("rendering LL......");

        if(loading){
            return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
        }

        if(!reason){
            return <>
                {data.map( (location,index) => (
                <div className={"list_child col display" + (location.id === selected ? " selected-bg-col" : " bg-col")}>           
                   <LocationWidget location={location} selectedHandler={handleSelectedLocation}/>
                </div> )) }
            </>
        }else{
            return <p>load fail: {reason}</p>
        }
    }

    return (<>{render()}</>
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


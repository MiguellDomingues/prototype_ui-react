import { useState, Suspense } from 'react'

import './LocationList.css'

import Location from '../components/Location'

import  { fetchProfileData } from '../utils/fakeApi' 

let resource = fetchProfileData(false);

const LocationList = () =>{

    const [ reload, setReload ] = useState(false)

    //const {posts, success, reason} = resource.posts.read();

    //const posts = resource.posts.read();

    /*
        showing how we can force another fetch by pressing a button in the data consumer wrapped in <Suspense> 
        this is in case the data fails to load; or we want to refresh with new data
    */
    const handleClick = (e) => {
        setReload(!reload)
        resource = fetchProfileData(true);    
    }

    return (
    <>
    <div className="list_container">
        <Suspense fallback={<h1> Loading profile...</h1>}>
           <WrappedLocationList props={handleClick}/>
        </Suspense> 
    </div>
    </>
    );  
}

const WrappedLocationList = ( { props }) =>{

    console.log("inner: ", resource)

    const {success, posts, reason} = resource.posts.read();

      return (<>     
        { success ? posts.map( location => (
            <div className="list_child col display">
                {/*ID: {location.id}<br/>
                address: {location.address}<br/>
                x: {location.x}<br/>
        y: {location.y}<br/>*/}
                <Location props={location}/>
            </div>
        )) : <>
            <h1>{reason}</h1>
            <button onClick={props} name="status">Reload</button><br/>
                
        </>}
      </>)
}

export default LocationList


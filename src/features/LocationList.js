import { useState, useEffect, useRef } from 'react'

import './LocationList.css'
import LocationWidget from '../components/LocationWidget'
import { InfinitySpin } from 'react-loader-spinner'

const LocationList = ( props ) =>{

    //console.log("LL start: props: ", props)

    if(props.isLoading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    const locations = props.data.posts 
    const {success, reason } = props.data
    const {selected} = props
    const selectedLocationHandler = props.selectedLocationHandler

    const render = () =>{

        //console.log("LL data: ", locations, success, reason, selected)

        if(success){
            return <>
                {locations.map( (location) => (
                <div className={"list_child col display"}>           
                   <LocationWidget 
                        key={location.id}
                        selected={selected} 
                        location={location} 
                        selectedHandler={selectedLocationHandler}/>
                </div> )) }
            </>
        }else{
            return <p>load fail: {reason ? reason : <>unknown reason</>}</p>
        }
    }

    return (<>{render()}</>
    );  
}

export default LocationList


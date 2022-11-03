
import './LocationList.css'
import LocationWidget from './LocationWidget'
import { InfinitySpin } from 'react-loader-spinner'

import { useLocationContext } from '../LocationContext'

const LocationList = ( props ) =>{

    //console.log("LL start: props: ", props)
    console.log("location list start:", props)

    //rather then pass props down from parent
    //pass the parent context and deconstruct the props you need
    
    const {selected,handleSelectedLocation} = useLocationContext()
   // const {
      //  data,
      //  loading} = props.useDataContext()

    const { filteredPosts, data, loading } = props.depenendencies

   
    if(loading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    const render = () =>{

        if(data.success){
            return <>
                {filteredPosts.map( (location) => (
                <div className={"list_child col display"}>           
                   <LocationWidget 
                        key={location.id}
                        selected={selected} 
                        location={location} 
                        selectedHandler={handleSelectedLocation}/>
                </div> )) }
            </>
        }else{
            return <p>load fail: {data.reason ? data.reason : <>unknown reason</>}</p>
        }
    }

    return (<>{render()}</>
    );  
}

export default LocationList


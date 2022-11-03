
import './LocationList.css'
import LocationWidget from '../components/LocationWidget'
import { InfinitySpin } from 'react-loader-spinner'

const LocationList = ( props ) =>{

    //console.log("LL start: props: ", props)
    console.log("location list start:")

    //rather then pass props down from parent
    //pass the parent context and deconstruct the props you need

    const {
        data,
        loading,
        selected,
        filteredPosts,
        handleSelectedLocation,
      } = props.context

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


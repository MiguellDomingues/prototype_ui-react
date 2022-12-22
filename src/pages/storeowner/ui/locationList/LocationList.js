
import './LocationList.css'
import { useLocationList } from './useLocationList'
import { InfinitySpin } from 'react-loader-spinner'
import LocationWidget from '../locationWidget/LocationWidget'
import LocationForm from '../locationForm/LocationForm'

const LocationList = ( props ) =>{

    const {posts, data, loading, selectedLocation, selectLocation } = props.context

    const [showButton, {toggleButton} ] = useLocationList(posts, selectedLocation)

    if(loading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    const isSelectedLocation = (selectedLocation, id) => selectedLocation === id 

    const render = () =>{

        if(data.success){
            return <>
                {posts.map( (location) => (
                <div className={"list_child col display"}>           
                   <LocationWidget 
                        key={location.id}
                        isSelected={isSelectedLocation(selectedLocation, location.id)}
                        //selected={selectedLocation} 
                        location={location} 
                        selectedHandler={selectLocation}/>
                </div> )) }
            </>
        }else{
            return <p>load fail: {data.reason ? data.reason : <>unknown reason</>}</p>
        }
    }

    return (<>
        {render()}
        { (showButton ? <LocationButton toggleButton={toggleButton}/> : 
                        <LocationForm
                            toggleButton={toggleButton}
                            addLocation={null}
                            selectedLocation={selectedLocation}                  
                        />)}

    </>
    );  
}

export default LocationList

const LocationButton = (props) =>{

    const { toggleButton } = props

    return (
        <div className="card_child_button">
            <button 
                onClick={toggleButton}>
                    Create New Location
            </button>
        </div>)
}





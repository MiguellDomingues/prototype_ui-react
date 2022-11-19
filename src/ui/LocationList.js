
import './LocationList.css'
import LocationWidget from './LocationWidget'
import { InfinitySpin } from 'react-loader-spinner'

const LocationList = ( props ) =>{

    //console.log("LL start: props: ", props)
    

    //rather then pass props down from parent
    //pass the parent context and deconstruct the props you need
    
    const {posts, data, loading, selectedLocation, selectLocation} = props.context

    

    //console.log("location list: ")
   // console.log("data: ", data)
    
    //console.log("loading: ", loading)
    
   // console.log("selectedLocation: ", selectedLocation)

   // console.log("select Location: ", selectLocation)

    if(loading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    const isSelectedLocation = (selectedLocation, id) => !isNaN(selectedLocation) && selectedLocation === id 

    //const filteredPosts = !props.context.filteredPosts ? data.posts : props.context.filteredPosts

    //console.log("filtered posts: ", filteredPosts)

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

    return (<>{render()}</>
    );  
}

export default LocationList


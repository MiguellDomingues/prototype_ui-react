
import './LocationList.css'
import LocationWidget from './LocationWidget'
import { InfinitySpin } from 'react-loader-spinner'

import { useLocationContext } from '../useLocationList'

const LocationList = ( props ) =>{

    //console.log("LL start: props: ", props)
    

    //rather then pass props down from parent
    //pass the parent context and deconstruct the props you need
    
    const {posts, data, loading, selected, handleSelectedLocation} = props.context

    

    console.log("location list: ")
    console.log("data: ", data)
    
    console.log("loading: ", loading)
    
    console.log("selected: ", selected)

    /*
    const applyFilter = (filters, data) => {

        //console.log("apply filter: ",filters,data)
        if(data){
          //console.log("apply ", updatedFilters,data)
          return data.posts.filter( (post) => filters.every( (filterName) => post.icons.includes(filterName) ) )
        }else{
          //console.log("data is undefined ", updatedFilters,data)
          return []
        }  
      }
      */
      

    if(loading){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    //const filteredPosts = !props.context.filteredPosts ? data.posts : props.context.filteredPosts

    //console.log("filtered posts: ", filteredPosts)

    const render = () =>{

        if(data.success){
            return <>
                {posts.map( (location) => (
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


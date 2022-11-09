
import { IconContext } from "react-icons";
import { getIcon } from "../utils/icons";
import "./LocationWidget.css"

const LocationWidget = (props) =>{

    const isSelected = props.isSelected
    const {id, address, info, icons} = props.location
    //const {lat, lng} = props.location.LatLng

    /* sort icons lexiographically before display on UI*/
    const lexCompare = (lhs, rhs) => { return lhs > rhs ? -1 : rhs > lhs ? 1 : 0 }
    const setBGColour = (isSelected) => isSelected ? " selected-bg-col" : " bg-col" 
    const setIcons = (icons) => { return icons.sort(lexCompare).map( (icon)=>(  getIcon(icon)  ) )}

    return (<>
        <div
            className={setBGColour(isSelected)}
            onClick={ (e) => {props.selectedHandler(id)} }>
        address: {address} {"     "} info: {info} <br/>
        {setIcons(icons)}
        </div>
        </>
    );
}

export default LocationWidget
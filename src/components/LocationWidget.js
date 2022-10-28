
import { IconContext } from "react-icons";
import getIcon from "../utils/icons";
import "./LocationWidget.css"

const LocationWidget = (props) =>{

    const selected = props.selected
    const {id, address, info, icons} = props.location
    //const {lat, lng} = props.location.LatLng

    /* sort icons lexiographically before display on UI*/
    const lexCompare = (lhs, rhs) => { return lhs > rhs ? -1 : rhs > lhs ? 1 : 0 }

    const setBGColour = (selected, id) => { return !isNaN(selected) && selected === id ? " selected-bg-col" : " bg-col" }
    const setIcons = (icons) => { return icons.sort(lexCompare).map( (icon)=>(  getIcon(icon)  ) )}

    return (<>
        <div
            className={setBGColour(selected, id)}
            onClick={ (e) => {props.selectedHandler(e, id)} }>
        address: {address} {"     "} info: {info} <br/>
        {setIcons(icons)}
        </div>
        </>
    );
}

export default LocationWidget
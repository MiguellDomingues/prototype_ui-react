
import { IconContext } from "react-icons";
import { getIconNames, getIcon } from "../utils/icons";

import './locationfilter.css'

const LocationFilter = () => {


    return(<>
            <div className="locationfilter_container">
                {getIconNames().map( (iconName) => (
                    <div 
                        className="locationfilter_child_filter row"
                        onClick={ (e)=>{console.log("click: ", iconName)} }>
                        <span className="display">{getIcon(iconName)}</span>
                    </div>
                ) )}
            </div>
        </>
    )
}

export default LocationFilter

import { IconContext } from "react-icons";
import { getIconNames, getIcon,  getIconId } from "../utils/icons";

import './locationfilter.css'

const LocationFilter = (props) => {

    const { filters, handleSelectFilter, handleDeselectFilter} = props

    //console.log("LocationFilter//props: ", filters, selectedFilterHandler)

    const getIconHandler = (iconName) => filters.includes(iconName) ? handleDeselectFilter(iconName) : handleSelectFilter(iconName)

    const getCSSSelectedIconColor = (iconName) => { return { className: filters.includes(iconName) ? "selected_icon_col" : "unselected_icon_col"} }
    const getCSSSelectedIconBG = (iconName) => { return filters.includes(iconName) ? " selected_icon_bg" : " unselected_icon_bg" }
//{ className: filters.includes(iconName) ? "selected_icon" : "unselected_icon"}
    return(<>
            <div className="locationfilter_container">
                {getIconNames().map( (iconName) => (
                    <div 
                        key={getIconId(iconName)}
                        className={"locationfilter_child_filter row" + getCSSSelectedIconBG(iconName)}
                        //(e)=>{console.log("click: ", iconName)}
                        onClick={ getIconHandler (iconName) }
                        //onClick={ selectedFilterHandler(iconName) }
                        >
                            <IconContext.Provider 
                                value={getCSSSelectedIconColor(iconName)}>
                                <span className="display">{getIcon(iconName)}</span>
                            </IconContext.Provider>        
                    </div>
                ) )}
            </div>
        </>
    )
}

export default LocationFilter
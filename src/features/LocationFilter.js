
import { IconContext } from "react-icons";
import { getIconNames, getIcon,  getIconId } from "../utils/icons";

import './locationfilter.css'

const LocationFilter = (props) => {

    const { filters, handleSelectFilter, handleDeselectFilter, loading} = props.context

    const getIconHandler = (iconName) => filters.includes(iconName) ? handleDeselectFilter(iconName) : handleSelectFilter(iconName)

    const getCSSSelectedIconColor = (iconName) => { return { className: filters.includes(iconName) ? "selected_icon_col" : "unselected_icon_col"} }
    const getCSSSelectedIconBG = (iconName) => { return filters.includes(iconName) ? " selected_icon_bg" : " unselected_icon_bg" }

    return(<>
            <div className="locationfilter_container">
                {getIconNames().map( (iconName) => (
                    <div 
                        key={getIconId(iconName)}
                        className={"locationfilter_child_filter row" + getCSSSelectedIconBG(iconName)}      
                        onClick={ !loading ? getIconHandler (iconName) : null }>
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
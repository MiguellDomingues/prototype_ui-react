
import { IconContext } from "react-icons";
import { getIconNames, getIcon,  getIconId } from "../../../utils/icons";

import {useFilterContext} from '../FilterContext'

import './locationfilter.css'

const LocationFilter = (props) => {

    console.log("location filter:", props)

    //const { useDataContext, useAppointmentContext, useFilterContext, useLocationContext } 

   // const { filters, handleSelectFilter, handleDeselectFilter} = props.useFilterContext
   // const {loading} = props.useDataContext

   const { filters, handleSelectFilter, handleDeselectFilter } = useFilterContext()

   //console.log(" filter state/handlers ", filters, handleSelectFilter, handleDeselectFilter)

   const { loading } = props.dependencies

    console.log("location filter start:" ,filters, loading)
    

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
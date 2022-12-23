
import { IconContext } from "react-icons";
import { getIconNames, getIcon,  getIconId } from "../../../../utils/icons";

import { useIconPicker } from "./useIconPicker"

import './iconpicker.css'

const IconPicker = (props) => {

    const handleChangeIcons  = props.handleChangeIcons

    //console.log("ICON PICKER STARTING ICONS: ", props.inputIcons)
    
    const [ selectedIcons,{toggleIcon} ] = useIconPicker(handleChangeIcons, props.inputIcons)
    
    const getSelectedIconColor = (iconName) => { return { className: selectedIcons.includes(iconName) ? "location_icon_picker_selected_col" : "location_icon_picker_icon_col"} }
    const getSelectedIconBG = (iconName) => { return selectedIcons.includes(iconName) ? " location_icon_picker_selected_bg" : " location_icon_picker_unselected_bg" }

    return(<>
            <div className="location_icon_picker_container">
                {getIconNames().map( (iconName) => (
                    <div 
                        key={getIconId(iconName)}
                        className={"location_icon_picker_child row" + getSelectedIconBG(iconName)}      
                        onClick={ toggleIcon (iconName) }>
                            <IconContext.Provider 
                                value={getSelectedIconColor(iconName)}>
                                <span className="display">{getIcon(iconName)}</span>
                            </IconContext.Provider>     
                    </div>
                ) )}
            </div>
        </>
    )
}

export default IconPicker
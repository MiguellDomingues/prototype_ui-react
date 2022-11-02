/* 
    TODO:
    - change this so the icon names coming from data dont need to be the name of icon component
        ie: FAWrench could be 'wrench' and getIcon("wrench") returns the FaWrench Component
*/

import { FaWrench, FaOilCan, FaCarBattery} from "react-icons/fa";
import { MdOutlineCarRepair, MdLocalCarWash } from "react-icons/md";
import { GiMechanicGarage} from "react-icons/gi";

/*
    'icons' is already a enumerated type
*/


const icons = {
    FaWrench: () => <FaWrench/>, 
    MdOutlineCarRepair: () => <MdOutlineCarRepair/>, 
    FaOilCan: () => <FaOilCan/>, 
    MdLocalCarWash: () => <MdLocalCarWash/>, 
    GiMechanicGarage: () => <GiMechanicGarage/>,  
    FaCarBattery: () => <FaCarBattery/>, 
}

export function getIcon(iconStr){ 
    return icons[iconStr]() 
}

export function getIconNames(){
    return Object.keys(icons)
}

export function getIconsById(){
    return Object.keys(icons)
}


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

const START_ID = 0;

//this is an example of CONFIG DATA; information that should not change often during users session
// or its only changed by the user
//in this case, it returns a component icon
// we could configure this also
// this data should be fetched dynamically
const icons = {
    FaWrench: () => <FaWrench/>, 
    MdOutlineCarRepair: () => <MdOutlineCarRepair/>, 
    FaOilCan: () => <FaOilCan/>, 
    MdLocalCarWash: () => <MdLocalCarWash/>, 
    GiMechanicGarage: () => <GiMechanicGarage/>,  
    FaCarBattery: () => <FaCarBattery/>, 
}

//adds a unique id for each unique key in icons
// this is an example of creating some unique presistant state in a react app
// for as long as page is not refreshed
const getIDbyName = (() => {

    let id = START_ID
    //make private copy of icons object with integer ids as values for the keys
    const iconIds = ( Object.keys(icons) ).reduce( (pV, cV) => { 
        //reducer function
        pV[cV] = id++; 
        return pV
    },{})
  
   return (iconStr) => {return iconIds[iconStr]}
})();

export function getIconId(iconStr){
    return getIDbyName(iconStr)
}

export function getIcon(iconStr){ 
    return icons[iconStr]() 
}

export function getIconNames(){
    return Object.keys(icons)
}


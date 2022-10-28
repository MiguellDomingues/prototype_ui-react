import { FaWrench, FaOilCan, FaCarBattery} from "react-icons/fa";
import { MdOutlineCarRepair, MdLocalCarWash } from "react-icons/md";
import { GiMechanicGarage} from "react-icons/gi";

const icons = {
    FaWrench: () => <FaWrench/>, 
    MdOutlineCarRepair: () => <MdOutlineCarRepair/>, 
    FaOilCan: () => <FaOilCan/>, 
    MdLocalCarWash: () => <MdLocalCarWash/>, 
    GiMechanicGarage: () => <GiMechanicGarage/>,  
    FaCarBattery: () => <FaCarBattery/>, 
}


export default function getIcon(iconStr){ 
    return icons[iconStr]() 
}


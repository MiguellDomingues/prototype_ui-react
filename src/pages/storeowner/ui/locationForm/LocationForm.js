
import './locationForm.css'
import { useLocationForm } from './useLocationForm'
import { InfinitySpin } from 'react-loader-spinner'

import  IconPicker  from '../iconPicker/IconPicker'

const LocationForm = (props) =>{

    const { toggleButton,addLocation} = props

    const [formInput, submitting,{onChange,handleSubmit,onIconsChange}] = useLocationForm(addLocation,toggleButton)

    if(submitting){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }
    
    return (
        <div className="location_form col display">

            <span className="close" onClick={toggleButton}>x</span>
            
                <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Address"   value={formInput.address}   name="address"   onChange={onChange}/>
                     <input type="text" placeholder="Info"      value={formInput.info}      name="info"      onChange={onChange}/>
                     <IconPicker handleChangeIcons={onIconsChange}/> 
                     <button disabled={submitting} name="status">Confirm Location Details</button>
                </form>

        </div>)
}

export default LocationForm



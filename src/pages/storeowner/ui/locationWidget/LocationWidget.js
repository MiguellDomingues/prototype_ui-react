
import { getIcon } from "../../../../utils/icons";
import  IconPicker  from '../iconPicker/IconPicker'
import "./LocationWidget.css"

import { useLocationWidget } from './useLocationWidget'

const LocationWidget = (props) =>{

    //console.log("CONSTRUCTING LOCATION WIDGET: ", props.location)

    const isSelected = props.isSelected
    const {id, address, info, icons, LatLng} = props.location

    //console.log("CONSTRUCTING LOCATIONWIDGET id/selected?: ", id, isSelected)

    const [ _icons, isEdit, submitting, formInput,{
            toggleEdit, onIconsChange,onFormChange, handleSubmit, onLocationDelete
        }] = useLocationWidget(icons, address, info, id, LatLng, props.handlers)

    //console.log("CONSTRUCTING LOCATION WIDGET: ", isEdit)
    
    const setBGColour = (isSelected) => isSelected ? " selected-bg-col" : " bg-col"
    
    // if the user clicks on another location widget while the edit form is open, reset and close the edit form 
    if(!isSelected && isEdit){
        toggleEdit()
        return(<></>)
    }
    
    return (<>
        <div className={setBGColour(isSelected)} onClick={ (e) => {props.selectedHandler(id)} }>
            {isSelected ? 
                <>  
                    {isEdit ? <>
                        <form onSubmit={handleSubmit}>
                            <span className="close" onClick={toggleEdit}>x</span>
                            <input type="text" placeholder="Address"   value={formInput.address}   name="address"  onChange={onFormChange}/>
                            <input type="text" placeholder="Info"      value={formInput.info}      name="info"     onChange={onFormChange}/> <br/>
                            <IconPicker handleChangeIcons={onIconsChange} inputIcons={[..._icons ]}/> 
                            <button disabled={submitting} name="status">Confirm Location Details</button> 
                        </form>
                    </> : <>
                        <button className="storeowner_location_widget_selected" onClick={toggleEdit}> Edit Location </button> 
                        <button className="storeowner_location_widget_selected" onClick={onLocationDelete}> Delete Location </button> 
                        address: {address} {"     "} 
                        info: {info} <br/>
                        {_icons.map( (icon) => (getIcon(icon)) )}                 
                    </>} 
                </> : <>
                    address: {address} {"     "} 
                    info: {info} <br/>
                    {_icons.map( (icon) => (getIcon(icon)) )}
                </>}
        </div>
    </>);
}

export default LocationWidget
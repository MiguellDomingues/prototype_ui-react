
import { getIcon } from "../../../../utils/icons";
import  IconPicker  from '../iconPicker/IconPicker'
import "./LocationWidget.css"

import { useLocationWidget } from './useLocationWidget'

const LocationWidget = (props) =>{

    const isSelected = props.isSelected
    const {id, address, info, icons} = props.location

    console.log("CONSTRUCTING LOCATIONWIDGET id/selected?: ", id, isSelected)

    const [ isEdit, submitting, formInput,{
            toggleEdit, onIconsChange,onFormChange, handleSubmit, onLocationDelete
        }] = useLocationWidget(icons, address, info, id, props.handlers)

    console.log("CONSTRUCTING LOCATION WIDGET: ", isEdit)
    
    const setBGColour = (isSelected) => isSelected ? " selected-bg-col" : " bg-col"
    
    // if the user clicks on another widget while the form is open, close and reset that form
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
                            <IconPicker handleChangeIcons={onIconsChange} inputIcons={[...icons ]}/> 
                            <button disabled={submitting} name="status">Confirm Location Details</button> 
                        </form>
                    </> : <>
                        <button className="storeowner_location_widget_selected" onClick={toggleEdit}> Edit Location </button> 
                        <button className="storeowner_location_widget_selected" onClick={onLocationDelete}> Delete Location </button> 
                        address: {address} {"     "} 
                        info: {info} <br/>
                        {icons.map( (icon) => (getIcon(icon)) )}                 
                    </>} 
                </> : <>
                    address: {address} {"     "} 
                    info: {info} <br/>
                    {icons.map( (icon) => (getIcon(icon)) )}
                </>}
        </div>
    </>);
}

export default LocationWidget
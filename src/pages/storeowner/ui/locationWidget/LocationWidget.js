
import { getIcon } from "../../../../utils/icons";
import  IconPicker  from '../iconPicker/IconPicker'
import "./LocationWidget.css"

import { useLocationWidget } from './useLocationWidget'

const LocationWidget = (props) =>{

    //console.log("CONSTRUCTING LOCATIONWIDGET: ")

    const isSelected = props.isSelected
    const {id, address, info, icons} = props.location

    const [_icons, isEdit, {toggleEdit, onIconsChange}] = useLocationWidget(icons)

    console.log("CONSTRUCTING LOCATION WIDGET: ", isEdit)
    
    //console.log("sorted icons: ", _icons)

    const setBGColour = (isSelected) => isSelected ? " selected-bg-col" : " bg-col" 
    
    return (<>
        <div className={setBGColour(isSelected)} onClick={ (e) => {props.selectedHandler(id)} }>

            {isSelected ? 
                <>  
                    {isEdit ? <>

                        <form onSubmit={null}>
                            <span className="close" onClick={toggleEdit}>x</span>

                            <input type="text" placeholder="Address"   value={address}   name="address"  />
                            <input type="text" placeholder="Info"      value={info}      name="info"     /> <br/>
                            <IconPicker handleChangeIcons={onIconsChange} inputIcons={[..._icons]}/> 
                            <button disabled={null} name="status">Confirm Location Details</button> 
                        </form>
  
                    </> : <>

                        <button className="storeowner_location_widget_selected" onClick={toggleEdit}> Edit Location </button> 
                        <button className="storeowner_location_widget_selected" onClick={null}> Delete Location </button> 

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
        </>
    );
}

export default LocationWidget

/*


 <IconPicker handleChangeIcons={onIconsChange}/> 
<button disabled={submitting} name="status">Confirm Location Details</button>





<input type="text" placeholder="Address"   value={address}   name="address"  />
                <input type="text" placeholder="Info"      value={info}      name="info"     />
                {_icons.map( (icon) => (getIcon(icon)) )}


<div className="location_form col display">

            <span className="close" onClick={toggleButton}>x</span>
            
                <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Address"   value={formInput.address}   name="address"   onChange={onChange}/>
                     <input type="text" placeholder="Info"      value={formInput.info}      name="info"      onChange={onChange}/>
                     <IconPicker handleChangeIcons={onIconsChange}/> 
                     <button disabled={submitting} name="status">Confirm Location Details</button>
                </form>

        </div>)
*/
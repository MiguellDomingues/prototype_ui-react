import './appointmentwidget.css'
import { useAppointmentWidget } from './useAppointmentWidget'

import StatusPicker from '../statusPicker/StatusPicker'

const AppointmentWidget = (props) =>{

    const { date, start, end, id, status } = props.appointmentDetails
    const {handleSelectAppointment, editAppointmentStatus, selectedLocation} = props

    const isSelected = props.isSelected

    const [ editStatus,submitting,{ updateStatus, toggleEditStatus } ] = useAppointmentWidget(editAppointmentStatus, id, selectedLocation)

    const setBGColour = (isSelected) => isSelected ? " selected_appt" : " deselected_appt" 

    return <>
    
    <div className={setBGColour(isSelected)} onClick={handleSelectAppointment(id)}>
        Date: {date} <br/>
        start: {start} <br/>
        end: {end}  <br/>
        { isSelected && editStatus ? <StatusPicker /* only show picker when this widget has focus and button was clicked */
                        initialVal={status} 
                        updateStatus={updateStatus}
                        toggleEdit={toggleEditStatus}/> 
                    : <> status: {status}<br/> </>}
    </div>
    
    {(isSelected && !editStatus) && /* only show button when this widget has focus and button not clicked */
        (<div> <button onClick={ (e)=>toggleEditStatus() }> Update Status </button> </div>) } 
     
    </>
}

export default AppointmentWidget



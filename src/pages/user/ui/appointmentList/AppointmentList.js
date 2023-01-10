
import AppointmentWidget from '../appointmentWidget/AppointmentWidget'
import AppointmentForm from '../appointmentForm/AppointmentForm'

import './appointmentlist.css'
import { useAppointmentList } from './useAppointmentList'


const AppointmentList = (props) =>{

    const { selectedLocation,posts, addAppointment, removeAppointment } = props.context

   const [appointments, selectedAppointment, showButton, {selectAppointment,toggleButton} ] = useAppointmentList (posts, selectedLocation)

    const isSelectedAppointment = (id, selected_id) => selected_id === id 
    
    return <>
        <div className="card_container">
            {appointments.map( (appointment) => ( 
            <>
                <div className="card_child">
                    <AppointmentWidget
                        key={appointment.id} 
                        isSelected={isSelectedAppointment(appointment.id, selectedAppointment)}
                        appointmentDetails={appointment}
                        handleRemoveAppointment={removeAppointment}
                        selectedLocation={selectedLocation}
                        handleSelectAppointment={selectAppointment}/>
                </div>
            </>))}

        {selectedLocation !== undefined ? (showButton ? <AppointmentButton 
                                                    toggleButton={toggleButton}/> : 
                                                <AppointmentForm 
                                                    toggleButton={toggleButton}
                                                    addAppointment={addAppointment}
                                                    selectedLocation={selectedLocation}
                                                    />) : <></> }
        </div>
    </>
}

export default AppointmentList

const AppointmentButton = (props) =>{

    //console.log("togbut: ", props)

    const { toggleButton } = props

    return (
        <div className="card_child_button">
            <button 
                onClick={toggleButton}>
                    Make Appointment
            </button>
        </div>)
}

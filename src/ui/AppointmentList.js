
import AppointmentWidget from './AppointmentWidget'
import AppointmentForm from './AppointmentForm'

import './appointmentlist.css'
import { useAppointmentList } from './hooks/useAppointmentList'


const AppointmentList = (props) =>{

    const { selectedLocation,posts, addAppointment, removeAppointment } = props.context

    console.log("/////////////////////////appointment list props:////////////////////////")
    console.log("selectAppointment: ", selectedLocation)
    console.log("posts: ", posts)
    
    //console.log("selected: ", selected)
    console.log("removeAppointment: ", removeAppointment)
    console.log("addAppointment: ", addAppointment)

   const [appointments, selectedAppointment, showButton, {selectAppointment,toggleButton} ] = useAppointmentList (posts, selectedLocation)

   console.log("/////////////////////////appointment list :////////////////////////")
    console.log("appointments: ", appointments)
    console.log("selectedAppointment: ", selectedAppointment)
    console.log("showButton: ", showButton)
    console.log("selectAppointment: ", selectAppointment)
    console.log("toggleButton: ", toggleButton)

    const isSelectedAppointment = (id, selected_id) => { return !isNaN(selected_id) && selected_id === id }
    
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
                        //selectedAppointment={selectedAppointment}
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

    console.log("togbut: ", props)

    const { toggleButton } = props

    return (
        <div className="card_child_button">
            <button 
                onClick={toggleButton}>
                    Make Appointment
            </button>
        </div>)
}

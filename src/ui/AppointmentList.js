
import AppointmentWidget from './AppointmentWidget'
import AppointmentForm from './AppointmentForm'

import './appointmentlist.css'

const AppointmentList = (props) =>{

    const { selectAppointment, appointments, selectedAppointment,showButton, toggleButton,selected ,addAppointment} = props.context

    console.log("/////////////////////////appointment list start:////////////////////////")
    console.log("selectAppointment: ", selectAppointment)
    console.log("appointments: ", appointments)
    console.log("selectedAppointment: ", selectedAppointment)
    console.log("showButton " ,showButton)
    console.log("toggleButton", toggleButton)
    console.log("selected: ", selected)
    
    return <>
        <div className="card_container">
            {appointments.map( (appointment) => ( 
            <>
                <div className="card_child">
                    <AppointmentWidget
                        key={appointment.id} 
                        appointmentDetails={appointment}
                        selectedAppointment={selectedAppointment}
                        handleSelectAppointment={selectAppointment}/>
                </div>
            </>))}

        {selected !== undefined ? (showButton ? <AppointmentButton 
                                                    toggleButton={toggleButton}/> : 
                                                <AppointmentForm 
                                                    toggleButton={toggleButton}
                                                    addAppointment={addAppointment}
                                                    selected={selected}/>) : <></> }
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

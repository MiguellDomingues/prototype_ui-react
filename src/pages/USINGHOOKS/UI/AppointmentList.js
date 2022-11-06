
import AppointmentWidget from './AppointmentWidget'

import './appointmentlist.css'

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

const AppointmentForm = (props) =>{

    const { toggleButton } = props

    return (
        <div className="card_child_form">

            <span className="close" onClick={toggleButton}>x</span>
                <form onSubmit={toggleButton}>
                     <input type="text" placeholder="Date" value="" name="date"/><br/>
                     <input type="text" placeholder="Start Time" value="" name="start_time"/><br/>
                     <input type="text" placeholder="End Time" value="" name="end_time"/><br/>
                     
                     <button disabled={false} name="status">Confirm Details</button>
                </form>

        </div>)
}

const AppointmentList = (props) =>{

    const { selectAppointment, appointments, selectedAppointment,showButton, toggleButton,selected } = props.context

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

        {selected !== undefined ? (showButton ? <AppointmentButton toggleButton={toggleButton}/> : <AppointmentForm toggleButton={toggleButton}/>) : <></> }
        </div>
    </>
}

export default AppointmentList

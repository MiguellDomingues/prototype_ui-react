
import AppointmentWidget from './AppointmentWidget'

import './appointmentlist.css'

const AppointmentButton = (props) =>{

    console.log("togbut: ", props)

    const { toggleButton } = props

    return (
        <div className="card_child">
            <button 
                onClick={toggleButton}>
                    Make Appointment
            </button>
        </div>)
}

const AppointmentForm = () =>{

    return (
        <div className="card_child">
            <form>lalalla</form>
        </div>)
}

const AppointmentList = (props) =>{



    //{ appointments, setSelectedAppointment, selectedAppointment }

    const { selectAppointment, appointments, selectedAppointment,showButton, toggleButton,selected } = props.context
    console.log("/////////////////////////appointment list start:////////////////////////")
    console.log( selectAppointment, appointments, selectedAppointment,showButton, toggleButton)
    //console.log("appointments: ", appointments)
    //console.log("appointments: ", appointments, handleSelectAppointment, selectedAppointment)


    /*
const appointmentButton = (props) =>{

    

    return (
        <div className="card_child">
            <button 
                onClick={toggleButton}>
                    Make Appointment
            </button>
        </div>)
}

const appointmentForm = () =>{

    return (
        <div className="card_child">
            <form>lalalla</form>
        </div>)
}
*/

    return <>
        <div className="card_container">
        {appointments.map( (appointment) => ( 
            <>
                <div className="card_child">
                    <AppointmentWidget
                        key={appointment.id} 
                        appointmentDetails={appointment}
                        selectedAppointment={selectedAppointment}
                        handleSelectAppointment={selectAppointment}
                    />
                </div>
            </>))}

            {selected ? (showButton ? <AppointmentButton toggleButton={toggleButton}/> : <AppointmentForm/>) : <></> }
            
        </div>
    </>
}

export default AppointmentList


import AppointmentWidget from './AppointmentWidget'

import './appointmentlist.css'

const AppointmentList = (props) =>{

    //{ appointments, setSelectedAppointment, selectedAppointment }

    const { selectAppointment, appointments, selectedAppointment } = props.context
    //console.log("appointment list start:")
    //console.log("appointments: ", appointments)
    //console.log("appointments: ", appointments, handleSelectAppointment, selectedAppointment)

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
            
        </div>
    </>
}

export default AppointmentList

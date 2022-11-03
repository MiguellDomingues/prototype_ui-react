
import AppointmentWidget from './AppointmentWidget'

import { useAppointmentContext } from '../AppointmentContext'

import './appointmentlist.css'

const AppointmentList = (props) =>{

    const { appointments, handleSelectAppointment, selectedAppointment } = useAppointmentContext()
    console.log("appointment list start:", props)
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
                        handleSelectAppointment={handleSelectAppointment}
                    />
                </div>
            </>))}
            
        </div>
    </>
}

export default AppointmentList

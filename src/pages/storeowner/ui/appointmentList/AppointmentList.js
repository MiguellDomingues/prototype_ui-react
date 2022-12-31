
import AppointmentWidget from '../appointmentWidget/AppointmentWidget'

import './appointmentlist.css'
import { useAppointmentList } from './useAppointmentList'


const AppointmentList = (props) =>{

   const { selectedLocation,posts, removeAppointment } = props.context

   const [appointments, selectedAppointment, {selectAppointment} ] = useAppointmentList (posts, selectedLocation)

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
                        editAppointmentStatus={null}
                        selectedLocation={selectedLocation}
                        handleSelectAppointment={selectAppointment}/>
                </div>
            </>))}

        </div>
    </>
}

export default AppointmentList


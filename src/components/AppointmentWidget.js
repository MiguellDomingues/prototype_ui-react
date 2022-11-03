import './appointmentwidget.css'

const AppointmentWidget = (props) =>{

    const { date, start, end, id } = props.appointmentDetails
    const handleSelectAppointment = props.handleSelectAppointment
    const selectedAppointment = props.selectedAppointment

    const setBGColour = (selected, id) => { return !isNaN(selected) && selected === id ? " selected_appt" : " deselected_appt" }

    return <>
    <div 
        className={setBGColour(selectedAppointment, id)}
        onClick={handleSelectAppointment(id)}>
        Date: {date} <br/>
        start: {start} <br/>
        end: {end}  <br/>
    </div>
    </>
}

export default AppointmentWidget
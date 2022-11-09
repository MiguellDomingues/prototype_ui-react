import './appointmentwidget.css'

const AppointmentWidget = (props) =>{

    const { date, start, end, id } = props.appointmentDetails
    const {handleSelectAppointment,  handleRemoveAppointment} = props
    const selected = props.selected
   // const selectedAppointment = props.selectedAppointment  handleRemoveAppointment

    const isSelected = props.isSelected

    //const setBGColour = (selected, id) => { return !isNaN(selected) && selected === id ? " selected_appt" : " deselected_appt" }

    const setBGColour = (isSelected) => isSelected ? " selected_appt" : " deselected_appt" 

    return <>
    <div 
        className={setBGColour(isSelected)}
        onClick={handleSelectAppointment(id)}>
        Date: {date} <br/>
        start: {start} <br/>
        end: {end}  <br/>
    </div>
    {isSelected ? (<div> <button onClick={ (e)=>handleRemoveAppointment(selected,id)}>Cancel Appointment</button></div>) : <></>}
    </>
}

export default AppointmentWidget
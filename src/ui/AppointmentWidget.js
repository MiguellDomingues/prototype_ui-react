import './appointmentwidget.css'

const AppointmentWidget = (props) =>{

    const { date, start, end, id } = props.appointmentDetails
    const {handleSelectAppointment,  handleRemoveAppointment, selectedLocation} = props
    
    const isSelected = props.isSelected

    const setBGColour = (isSelected) => isSelected ? " selected_appt" : " deselected_appt" 

    return <>
    <div 
        className={setBGColour(isSelected)}
        onClick={handleSelectAppointment(id)}>
        Date: {date} <br/>
        start: {start} <br/>
        end: {end}  <br/>
    </div>
    {isSelected ? (<div> <button onClick={ (e)=>handleRemoveAppointment(selectedLocation,id)}>Cancel Appointment</button></div>) : <></>}
    </>
}

export default AppointmentWidget
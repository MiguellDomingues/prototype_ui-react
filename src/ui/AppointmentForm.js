
import './appointmentform.css'
import { useAppointmentForm } from './hooks/useAppointmentForm'
import { InfinitySpin } from 'react-loader-spinner'

const AppointmentForm = (props) =>{

    const { toggleButton,addAppointment, selected } = props

    const [formInput, submitting,{onChange,handleSubmit}] = useAppointmentForm(addAppointment,selected,toggleButton)

    
    if(submitting){
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }
    
    return (
        <div className="card_child_form">

            <span className="close" onClick={toggleButton}>x</span>
            
                <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Date"       value={formInput.date}          name="date"       onChange={onChange}/><br/>
                     <input type="text" placeholder="Start Time" value={formInput.start_time}    name="start_time" onChange={onChange}/><br/>
                     <input type="text" placeholder="End Time"   value={formInput.end_time}      name="end_time"   onChange={onChange}/><br/>
                     
                     <button disabled={submitting} name="status">Confirm Details</button>
                </form>

        </div>)
}

export default AppointmentForm


/*
    const spinner = () => {
        return <div className="spinner_container"><InfinitySpin width='200'color="#4fa94d"/></div>
    }

    const form = () => {<>
        <span className="close" onClick={toggleButton}>x</span>
                <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="Date"       value={formInput.date}          name="date"       onChange={onChange}/><br/>
                     <input type="text" placeholder="Start Time" value={formInput.start_time}    name="start_time" onChange={onChange}/><br/>
                     <input type="text" placeholder="End Time"   value={formInput.end_time}      name="end_time"   onChange={onChange}/><br/>
                     
                     <button disabled={submitting} name="status">Confirm Details</button>
        </form></>
    }

    return (
        <div className="card_child_form">
            {submitting ? spinner() : form()}
        </div>)
*/
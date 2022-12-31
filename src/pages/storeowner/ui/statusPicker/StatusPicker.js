
import useStatusPicker from './useStatusPicker'
import './StatusPicker.css'

const StatusPicker = (props) =>{

    const initialVal = props.initialVal
    const updateStatus= props.updateStatus
    const toggleEdit = props.toggleEdit
    
    //TEMP. get the values from a file in utils, the valid values for each user type will be determined from a fetch for config data
    const values = ['Approved', 'In Progress', 'Completed', 'Canceled'].filter( (val) => val !== initialVal)

    const [{handleStatusChange, handleSubmit}] = useStatusPicker(values[0], updateStatus)

    return <>
    <div className="picker_child">
        <select name="statuses" onChange={handleStatusChange}>
            {values.map( (status) => (<option value={status}>{status}</option>))}          
        </select>
        <span className="close" onClick={toggleEdit}>x</span><br/>
        <button name="status" onClick={handleSubmit}>Confirm New Status</button>
    </div>
    </>
}

export default StatusPicker

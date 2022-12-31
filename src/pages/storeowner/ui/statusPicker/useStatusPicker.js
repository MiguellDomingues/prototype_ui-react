import {useState} from 'react'

const useStatusPicker = (initialStatus, updateStatus) =>{

    const [status, setStatus] = useState(initialStatus)

    const handleStatusChange = (e) =>  setStatus(e.target.value) 
    const handleSubmit = () =>  { console.log("submit"); updateStatus(status)}

    return [ {handleStatusChange, handleSubmit} ]

}

export default useStatusPicker
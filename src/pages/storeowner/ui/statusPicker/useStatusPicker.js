import {useState} from 'react'

const useStatusPicker = (updateStatus) =>{

    const [status, setStatus] = useState(null)

    const handleStatusChange = (e) =>  setStatus(e.target.value) 
    const handleSubmit = () =>  {updateStatus(status)}

    return [ status,{handleStatusChange, handleSubmit}]

}

export default useStatusPicker
import {useState, useCallback} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useAppointmentForm = ( addAppointment, selectedLocation,toggleButton ) =>{

    const { createAppointment } = useAPI()

    //use 1 state object for form inputs
   const [formInput, setFormInput] = useState({date: "", start_time: "", end_time: ""})

    //use another state for registration response
    //const [status, setStatus] = useState()

    //.. and another for UI state
    const [submitting, setSubmit] =  useState(false)

    //const enableSubmit = () => (formInput.date.trim() && formInput.start_time.trim() && formInput.end_time.trim())

    //////////////////////////////////////////////////////////////////////////////////////////////////

    const success = (r) => {
        console.log("POST appointment", r)
        addAppointment(r.appointment, selectedLocation)
        toggleButton()
      }
  
      const failure = (r) => {
        console.log("error POST appointment", r.reason)  
      }
  
      const finish = (r) => {
        console.log("POST appointment finish")
        setSubmit(false)
       // setLoading(false)
      }

    /////////////////////////////////////////////////////////////////////////////////////////////////

    const onChange = e => {
        console.log("FORM ONCHANGE")
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value})
     }

     const handleSubmit = e => {
        e.preventDefault()
        console.log("FORM SUBMIT")
        if (formInput.date.trim() && formInput.start_time.trim() && formInput.end_time.trim()){ //check blanks
           
           const location_obj = {                                                               
            loc_id: selectedLocation,
            ...formInput
           }

           setSubmit(true)
           createAppointment(location_obj, success, failure, finish)
        } else {
          // setStatus({status: false, status_msg: "no empty fields"})    
        }
     }

    return [formInput, submitting,{onChange, handleSubmit}]
}
import {useState, useCallback} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useLocationForm = ( addLocation, toggleButton ) =>{

    const { createAppointment } = useAPI()

    //use 1 state object for form inputs
   const [formInput, setFormInput] = useState({address: "", info: ""})

   const [selectedIcons, setSelectedIcons] = useState([])

    //use another state for registration response
    //const [status, setStatus] = useState()

    //.. and another for UI state
    const [submitting, setSubmit] =  useState(false)

    //const enableSubmit = () => (formInput.date.trim() && formInput.start_time.trim() && formInput.end_time.trim())

    //////////////////////////////////////////////////////////////////////////////////////////////////

    const success = (r) => {
        console.log("POST appointment", r)
       // addAppointment(r.appointment, selectedLocation)
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

    const onIconsChange = (icons) =>{ setSelectedIcons([...icons]) }

     const handleSubmit = e => {
        e.preventDefault()

        if (formInput.address.trim() && formInput.info.trim()){ //check blanks
           
           const location_obj = {                                                               
            ...formInput,
            selectedIcons: selectedIcons
           }

           console.log("loc obj: ", location_obj)

           //setSubmit(true)
           //createAppointment(location_obj, success, failure, finish)
        } else {
          // setStatus({status: false, status_msg: "no empty fields"})    
        }
     }

    return [formInput, submitting,{onChange, handleSubmit, onIconsChange}]
}
import {useState, useCallback} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useLocationWidget = (_icons, address, info) =>{

   // const { editAppointment, deleteAppointment } = useAPI()

    const icons = _icons.sort( (lhs, rhs) => { return lhs > rhs ? -1 : rhs > lhs ? 1 : 0 } )
    const _address = address
    const _info = info

    const [isEdit, setEdit] = useState(false)
    const [submitting, setSubmit] =  useState(false)

    const [formInput, setFormInput] = useState({address: address, info: info})
    const [selectedIcons, setSelectedIcons] = useState([])

    console.log("isEdit state: ", isEdit)

    const onIconsChange = (icons) =>{ setSelectedIcons([...icons]) }

    const toggleEdit = () => {
        setFormInput({address: _address, info: _info})
        //setEdit(isEdit => !isEdit)
        setEdit(!isEdit)
    };

    const success = (r) => {
        console.log("POST appointment", r)
       // addAppointment(r.appointment, selectedLocation)
       // toggleButton()
      }
  
      const failure = (r) => {
        console.log("error POST appointment", r.reason)  
      }
  
      const finish = (r) => {
        console.log("POST appointment finish")
       // setSubmit(false)
       // setLoading(false)
      }

      const onFormChange = e => {
        console.log("FORM ONCHANGE")
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value})
     }

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

    return [
        icons, isEdit, submitting, formInput,
      {
        toggleEdit, onIconsChange, onFormChange, handleSubmit,
      }
    ]
}
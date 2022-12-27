import {useState, useCallback} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useLocationWidget = (_icons, address, info, id, LatLng, handlers) =>{

    const { editStoreOwnerLocation } = useAPI()

    const lexOrder = (lhs, rhs) => { return lhs > rhs ? -1 : rhs > lhs ? 1 : 0 }

    //keep a lexiographicly ordered copy of the icons upon component instantiation
    const icons = _icons.sort(lexOrder)

    const _address = address
    const _info = info

    const [isEdit, setEdit] = useState(false)

    const [submitting, setSubmit] =  useState(false)

    const [formInput, setFormInput] = useState({address: address, info: info})
    const [selectedIcons, setSelectedIcons] = useState([...icons])

    //console.log("isEdit state: ", isEdit)

    //sort the icons when they are changed in the edit
    const onIconsChange = (icons) =>{ setSelectedIcons([...icons].sort(lexOrder)) }

    const toggleEdit = () => {
        setFormInput({address: _address, info: _info})
        //setEdit(isEdit => !isEdit)
        setEdit(!isEdit)
    };

    const success = (r) => {
        console.log("PATCH LOCATION SUCCESS", r)
        handlers.editLocation(r)
       // addAppointment(r.appointment, selectedLocation)
       // toggleButton()
      }
  
      const failure = (r) => {
        console.log("PATCH LOCATION FAILURE", r.reason)  
      }
  
      const finish = (r) => {
        console.log("PATCH LOCATION FINISH")
       // setSubmit(false)
       // setLoading(false)
      }

      const onFormChange = e => {
        //console.log("FORM ONCHANGE")
        setFormInput({
          ...formInput,
          [e.target.name]: e.target.value})
     }

     const handleSubmit = e => {
        e.preventDefault()

        /*
         &&          
            (formInput.address !== address || 
             formInput.info !== info || 
             !selectedIcons.every((val, i) => val === icons[i]))
        */

        if( (formInput.address.trim() && formInput.info.trim())){ 
                 
           const location_obj = {                                                               
            ...formInput,
            id: id,
            LatLng: LatLng,
            icons: selectedIcons
           }

           //handlers.editLocation(location_obj)
           

           //setSubmit(true)

           editStoreOwnerLocation(location_obj, success, failure, finish)
           toggleEdit() 

           //createAppointment(location_obj, success, failure, finish)
        } else {
            console.log("submit failed; data is same as original")
          // setStatus({status: false, status_msg: "no empty fields"})    
        }
     }

     const onLocationDelete = () =>{
        handlers.removeLocation(id)
     }

    return [
       // icons, isEdit, submitting, formInput,
        icons,isEdit, submitting, formInput,
      {
        toggleEdit, onIconsChange, onFormChange, handleSubmit, onLocationDelete
      }
    ]
}
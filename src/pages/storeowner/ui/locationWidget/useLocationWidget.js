import { useState } from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useLocationWidget = (_icons, address, info, id, LatLng, handlers) =>{

    const { editStoreOwnerLocation, deleteLocation } = useAPI()

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
        setEdit(!isEdit)
    };

    //////////////////////////EDIT CALLBACKS////////////////////////

    const success_del = (r) => {
      console.log("DELETE LOCATION SUCCESS", r)
      handlers.removeLocation(r.id)
    }

    const failure_del = (r) => {
      console.log("DELETE LOCATION FAILURE", r.reason)  
    }

    const finish_del = (r) => {
      console.log("DELETE LOCATION FINISH")
      setSubmit(false)
    }

    ///////////////////////////////////////////////////////////////////////////

    //////////////////////////EDIT CALLBACKS////////////////////////

    const success = (r) => {
        console.log("PATCH LOCATION SUCCESS", r)
        handlers.editLocation(r)
      }
  
      const failure = (r) => {
        console.log("PATCH LOCATION FAILURE", r.reason)  
      }
  
      const finish = (r) => {
        console.log("PATCH LOCATION FINISH")
        setSubmit(false)
      }

      ///////////////////////////////////////////////////////////////////////////

      const onFormChange = e => {
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

           editStoreOwnerLocation(location_obj, success, failure, finish)
           setSubmit(true)
           toggleEdit() 

        } else {
            console.log("submit failed; data is same as original")  
        }
     }

     const onLocationDelete = () =>{
        setSubmit(true)
        deleteLocation(id, success_del, failure_del, finish_del)
     }

    return [
        icons,isEdit, submitting, formInput,
      {
        toggleEdit, onIconsChange, onFormChange, handleSubmit, onLocationDelete
      }
    ]
}
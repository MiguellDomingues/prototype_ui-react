import {useState} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useAppointmentWidget = ( editAppointmentStatus, appointment_id) =>{

    const { updateAppointmentStatus } = useAPI()

    const [editStatus, setEditStatus] = useState(false)

    const [submitting, setSubmitting] = useState(false)

    const updateStatus = (status) =>  {
        console.log("updateStatus")
        setSubmitting(true)
        updateAppointmentStatus({apt_id: appointment_id, new_status: status}, success,failure,finish)
    }

    const success = (r) => {
        console.log("updateStatus useAppointmentWidget: ", r)
        //editAppointmentStatus(r)
        setSubmitting(false)     
    }
  
    const failure = (r) => {
      console.log("error updateStatus useAppointmentWidget", r.reason) 
    }
  
    const finish = (r) => {
      console.log("finished updateStatus useAppointmentWidget")
      setSubmitting(false)
      setEditStatus(false)
    }

    const toggleEditStatus = () => { setEditStatus(!editStatus) }

      return [
        editStatus, submitting,
        {
          updateStatus,
          toggleEditStatus
        }
      ]
}
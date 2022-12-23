import {useState} from 'react'

import { useAPI } from '../../../../features/DataProvider'

export const useAppointmentWidget = ( handleRemoveAppointment, appointment_id, location_id ) =>{

    const { deleteAppointment } = useAPI()

    const [submitting, setSubmit] = useState(false)

   

    const cancelAppointment = () =>  {
        console.log("cancelAppointment: ")
        //handleRemoveAppointment(location_id,appointment_id)
        setSubmit(true)
        deleteAppointment(appointment_id, success,failure,finish)
    }

    const success = (r) => {
        console.log("delete appointment useAppointmentWidget: ", r)
        handleRemoveAppointment(location_id,appointment_id)
      }
  
      const failure = (r) => {
        console.log("error useAppointmentWidget", r.reason) 
      }
  
      const finish = (r) => {
        console.log("setloading useAppointmentWidget")
        setSubmit(false)
      }

      return [
        submitting,
        {
            cancelAppointment 
        }
      ]
}
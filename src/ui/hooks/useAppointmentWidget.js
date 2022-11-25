import {useState} from 'react'

import { useAPI } from '../../features/DataProvider'

export const useAppointmentWidget = ( handleRemoveAppointment, appointment_id, location_id ) =>{

    const { onDeleteAppointment } = useAPI()

    const [submitting, setSubmit] = useState(false)

    //console.log("--------------useAppointmentWidget---------------------")
   // console.log("handleRemoveAppointment: ", handleRemoveAppointment)
    console.log("appointment_id: ", appointment_id)
    console.log("location_id: ", location_id)

    const cancelAppointment = () =>  {
        console.log("cancelAppointment: ")
        //handleRemoveAppointment(location_id,appointment_id)
        setSubmit(true)
        onDeleteAppointment(appointment_id, success,failure,finish)
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
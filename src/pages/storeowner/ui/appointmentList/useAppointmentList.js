
import {useState, useCallback} from 'react'

export const useAppointmentList = ( posts = [], selectedLocation = undefined ) =>{

    const appointments = selectedLocation !== undefined ? posts.find( (post) =>  post.id === selectedLocation ).appointments : []

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    const selectAppointment = useCallback( (id) => {
      return (e) => {
        e.preventDefault();
        console.log("select APPOINTMENT: ", id)
        setSelectedAppointment(id)
    }} , [] );

    
  
    return [
      appointments, selectedAppointment, 
      {
        selectAppointment, 
      }
    ]
}

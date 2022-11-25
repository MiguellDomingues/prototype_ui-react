
import {useState, useCallback} from 'react'

export const useAppointmentList = ( posts = [], selectedLocation = undefined ) =>{

    const appointments = selectedLocation !== undefined ? posts.find( (post) =>  post.id === selectedLocation ).appointments : []

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    const [showButton, setShowButton] = useState(true)

    const selectAppointment = useCallback( (id) => {
      return (e) => {
        e.preventDefault();
        console.log("select APPOINTMENT: ", id)
        setSelectedAppointment(id)
    }} , [] );

    const toggleButton = useCallback(() => setShowButton(showButton => !showButton), []);
  
     // console.log("appointments: ", appointments)
      //console.log("selected appointment: ", selectedAppointment)

      return [
        appointments, selectedAppointment, showButton, 
        {
          selectAppointment, toggleButton
        }
      ]
}


import {useState} from 'react'

export const useAppointmentContext = ( data ) =>{

    //data DEPENDENCY

    console.log("//////////////////////AppointmentContextProvider///////////////////////////")

    //const {data} = props.context.dependencies

    const [appointments, setAppointments] = useState([]);

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    const selectLocationAppointments = (id) => {

        //this line is using array.find() to return the post object with id equal to passed in id, then reading the appointments array
        const appts = data.posts.find( (post) => {return post.id === id} ).appointments
        setAppointments(appts)
      }

      const selectAppointment = (id) => {
        return (e) => {
          e.preventDefault();
          console.log("select APPOINTMENT: ", id)
          setSelectedAppointment(id)
      }}

      const value ={
        appointments, 
        setAppointments:setAppointments,
        selectedAppointment, 
        setSelectedAppointment:setSelectedAppointment,
        selectLocationAppointments : selectLocationAppointments,
        selectAppointment : selectAppointment
      }

      return value
}

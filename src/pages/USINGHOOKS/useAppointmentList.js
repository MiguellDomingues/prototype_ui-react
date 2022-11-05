
import {useState} from 'react'

export const useAppointmentList = ( data ) =>{

    const posts = data && data.posts ? data.posts : []

    //console.log("//////////////////////AppointmentContextProvider///////////////////////////")
    const [appointments, setAppointments] = useState([]);

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    //takes a location id
    const selectLocationAppointments = (id) => {
       // console.log("selected appointment: ", id, " using data ", data)
        //this line is using array.find() to return the post object with id equal to passed in id, then reading the appointments array
        const appts = posts.find( (post) =>  post.id === id ).appointments
       // console.log(" selectLocationAppointments appointments: ", appts)
        setAppointments(appts)
      }

      //takes apt id
      const selectAppointment = (id) => {
        return (e) => {
          e.preventDefault();
          console.log("select APPOINTMENT: ", id)
          setSelectedAppointment(id)
      }}

     // console.log("appointments: ", appointments)
      //console.log("selected appointment: ", selectedAppointment)

      return [
        appointments, selectedAppointment,
        {
          selectAppointment, selectLocationAppointments
        }
      ]
}

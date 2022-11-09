
import {useState, useCallback} from 'react'

export const useAppointmentList = ( data ) =>{

    const posts = data && data.posts ? data.posts : []

    console.log("useAppointments: ", data)

    //console.log("//////////////////////AppointmentContextProvider///////////////////////////")
    const [appointments, setAppointments] = useState([]);

    /* id of a selected (highlighted) appointment */
    const [selectedAppointment, setSelectedAppointment] = useState();

    const [showButton, setShowButton] = useState(true)

    //takes a location id
    const selectLocationAppointments = (id) => {
       // console.log("selected appointment: ", id, " using data ", data)
        //this line is using array.find() to return the post object with id equal to passed in id, then reading the appointments array
        const appts = posts.find( (post) =>  post.id === id ).appointments
       // console.log(" selectLocationAppointments appointments: ", appts)
        setAppointments(appts)
      }

      /*
      //takes apt id
      const selectAppointment = (id) => {
        return (e) => {
          e.preventDefault();
          console.log("select APPOINTMENT: ", id)
          setSelectedAppointment(id)
      }}
*/

    const selectAppointment = useCallback( (id) => {
      return (e) => {
        e.preventDefault();
        console.log("select APPOINTMENT: ", id)
        setSelectedAppointment(id)
    }} , [] );

    const resetAppointmentList = () =>{
      setShowButton(true)
      setSelectedAppointment(undefined)
    }

    //const resetButton = useCallback( () => setShowButton(true), []);

    const toggleButton = useCallback(() => setShowButton(showButton => !showButton), []);
    //const toggleButton = () => setShowButton(showButton => !showButton);

     // console.log("appointments: ", appointments)
      //console.log("selected appointment: ", selectedAppointment)

      return [
        appointments, selectedAppointment, showButton, 
        {
          selectAppointment, selectLocationAppointments, toggleButton,resetAppointmentList
        }
      ]
}

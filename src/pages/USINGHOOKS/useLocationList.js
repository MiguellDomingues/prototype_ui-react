
import {useState} from 'react'
import React from "react";


export const useLocationList = ( selectLocationAppointments ) =>{

    console.log("//////////////////////LocationContextProvider///////////////////////////")

    // DEPENDENCIES
    //const {selectLocationAppointments, setSelectedAppointment } = useAppointmentContext()

      /* track the id of the selected entity to update map/list*/
    const [selected, setSelected] = useState();

    //selectLocationAppointments(id)

    const selectLocation = (e, id) => {
        //e.preventDefault();
        console.log("select location GP: ", id)
        setSelected(id)
        // when user clicks on a location, set the appointments array
        selectLocationAppointments(id)
        //.. and erase the current selected appointment
        //setSelectedAppointment()
      }

  return[
      selected,
      { 
        setSelected: setSelected,
        handleSelectedLocation: selectLocation
      },
    ];
}
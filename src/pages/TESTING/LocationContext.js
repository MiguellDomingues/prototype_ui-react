
import {useState} from 'react'
import React from "react";

import { useAppointmentContext } from './AppointmentContext'

const LocationContext  = React.createContext(null);

export const LocationContextProvider = ( { children } ) =>{

    console.log("//////////////////////LocationContextProvider///////////////////////////")

    // DEPENDENCIES
    const {selectLocationAppointments, setSelectedAppointment } = useAppointmentContext()

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
        setSelectedAppointment()
      }

    const value =
    {
        selected, 
        setSelected: setSelected,
        handleSelectedLocation: selectLocation
    }

    return <>
    <LocationContext.Provider value={value}>
        {children}
    </LocationContext.Provider>
    </>

}

export const useLocationContext = () => {
    return React.useContext(LocationContext );
};
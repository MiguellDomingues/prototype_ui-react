/***************************DELETE LOCATION ENDPOINT***********************/

const ENDPOINT_URL_LOCATION = 'http://localhost:8080/location/'

const DELETE_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to deletet storeowner location"
}

const deleteLocation = (loc_id, key) => {

  console.log("delete storeowner location:")
  console.log("location id: ", loc_id)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => { 

    const request_body = {
      loc_id:     loc_id,
      storeowner_id:    key,
    }
    
    console.log("deleteLocation: ", request_body)

      fetch(ENDPOINT_URL_LOCATION, {
      method: 'DELETE',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {
      
      console.log("delete storeowner location SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data)
      }

      return reject(DELETE_STOREOWNER_LOCATION_FAILURE)
    })
    .catch((error) => {
      console.log('Error Delete Storeowner Location.', error);
      return reject(DELETE_STOREOWNER_LOCATION_FAILURE)
    });

});}

/************************************************************************************************/

/***************************DELETE APPOINTMENT ENDPOINT***********************/

const ENDPOINT_URL_APPOINTMENT = 'http://localhost:8080/appointment/'

const DELETE_USER_APPOINTMENT_FAILURE = {
  success:false,
  reason: "failed to deletet user appointment"
}

const deleteUserAppointment = (appointment_id, key) => {

  console.log("delete user appointment mock:")
  console.log("appointment id: ", appointment_id)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => { 

    const request_body = {
      apt_id:     appointment_id,
      user_id:    key,
    }
    
    console.log("deleteUserApt: ", request_body)

      fetch(ENDPOINT_URL_APPOINTMENT, {
      method: 'DELETE',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {
      
      console.log("delete user appointment SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data)
      }

      return reject(DELETE_USER_APPOINTMENT_FAILURE)
    })
    .catch((error) => {
      console.log('Error Posting User Appointment.', error);
      return reject(DELETE_USER_APPOINTMENT_FAILURE)
    });

});}

/************************************************************************************************/

export const DELETE = { deleteUserAppointment, deleteLocation }

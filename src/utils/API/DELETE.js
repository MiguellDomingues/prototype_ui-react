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

export const DELETE = { deleteUserAppointment }

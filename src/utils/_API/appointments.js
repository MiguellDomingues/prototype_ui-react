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

      fetch(ENDPOINT_URL_APPOINTMENT + '?key=' + key, {
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

/***************************EDIT APPOINTMENT ENDPOINT***********************/

//const ENDPOINT_URL_APPOINTMENT = 'http://localhost:8080/appointment/'

const PATCH_STOREOWNER_APPOINTMENT_FAILURE = {
  success:false,
  reason: "failed to edit storeowner location"
}

const updateAppointmentStatus = (payload, key) => {

  console.log("edit storeowner appointment:")
  console.log("apt_id: ",     payload.apt_id)
  console.log("new_status: ", payload.new_status)
  console.log("storeowner key: ", key)

  return new Promise( (resolve, reject) => { 

    const request_body = {
      storeowner_id:    key, 
      ...payload
    }

    console.log("updateAppointmentStatus SERVER REQUEST BODY:", request_body)

    fetch(ENDPOINT_URL_APPOINTMENT+ '?key=' + key, {
      method: 'PATCH',
      body: JSON.stringify(request_body),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("updateAppointmentStatus SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data.appointment)
      }

      return reject(PATCH_STOREOWNER_APPOINTMENT_FAILURE)
    })
    .catch((error) => {
      console.log('Error posting storeowner location.', error);
      return reject(PATCH_STOREOWNER_APPOINTMENT_FAILURE)
    });

});}

/***************************CREATE APPOINTMENT ENDPOINT***********************/

//const ENDPOINT_URL_APPOINTMENT = 'http://localhost:8080/appointment/'

const POST_USER_APPOINTMENT_FAILURE = {
  success:false,
  reason: "failed to post user appointment"
}

const postUserAppointment = (appointment, key) => {

  console.log("post user appointment mock:")
  console.log("appointment: ", appointment)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => { 

    const request_body = {
      loc_id:     appointment.loc_id,
      user_id:    key,
      date:       appointment.date,
      start_time: appointment.start_time,
      end_time:   appointment.end_time
    }

    fetch(ENDPOINT_URL_APPOINTMENT + '?key=' + key, {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("post user appointment SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data)
      }

      return reject(POST_USER_APPOINTMENT_FAILURE)
    })
    .catch((error) => {
      console.log('Error Posting User Appointment.', error);
      return reject(POST_USER_APPOINTMENT_FAILURE)
    });

});}

export const appointments = { postUserAppointment, updateAppointmentStatus, deleteUserAppointment }


/***************************CREATE LOCATION ENDPOINT***********************/

const ENDPOINT_URL_LOCATION = 'http://localhost:8080/location/'

const POST_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to post storeowner location"
}

const putStoreOwnerLocation = (location, key) => {

  console.log("post storeowner location:")
  console.log("location: ", location)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => { 

    //return random double between min and max inclusive/exclusive
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    const request_body = {
      storeowner_id:    key, 
      LatLng: {
        lat: 47.91961776025469 + getRandom(-2.5, 2.5), 
        lng: -0.7844604492 + getRandom(-0.5, 0.5)
      },
      appointments: [],
      ...location
    }

    fetch(ENDPOINT_URL_LOCATION, {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("post storeowner location SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data)
      }

      return reject(POST_STOREOWNER_LOCATION_FAILURE)
    })
    .catch((error) => {
      console.log('Error posting storeowner location.', error);
      return reject(POST_STOREOWNER_LOCATION_FAILURE)
    });

});}

/***************************CREATE APPOINTMENT ENDPOINT***********************/

const ENDPOINT_URL_APPOINTMENT = 'http://localhost:8080/appointment/'

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

    fetch(ENDPOINT_URL_APPOINTMENT, {
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

/***************************USER LOGGING ON ENDPOINT***********************/

const ENDPOINT_URL_AUTHENTICATE = 'http://localhost:8080/auth'

const START_SESSION_FAILURE = {
  reason: "bad crddddeds"
}

const startSession = (request) => {
  console.log("---logging on---", request)

  return new Promise( (resolve, reject) => {

    const request_body = {
      user_name: request.username,
      password: request.password
    }

    fetch(ENDPOINT_URL_AUTHENTICATE, {
      method: 'POST',
      body: JSON.stringify(request_body),
      // need to set header to 'application/json' to send POST methods
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("RESPONSE FROM SERVER IN AUTHENTICATE: ", data);

      if(data.key && data.type && data.path){
        data.success = true
        return resolve(data)
      }

      return reject(START_SESSION_FAILURE)
    })
    .catch((error) => {
      console.log('Error logging on.', error);
      return reject(START_SESSION_FAILURE)
    });

  })
;}

/************************************************************************************************/

/***************************REGISTER NEW USER ACCOUNT ENDPOINT***********************/

const ENDPOINT_URL_CREATEUSER = 'http://localhost:8080/register'

const REGISTER_USER_FAILURE = {
  reason: "username taken"
}

const registerUser = (request) => {

  console.log("---creating new user---", request)

  return new Promise( (resolve, reject) => {

    const request_body = {
      type: request.type,
      user_name: request.username,
      password: request.password
    }

    fetch(ENDPOINT_URL_CREATEUSER, {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("RESPONSE FROM SERVER IN createuser: ", data);

      if(data.key && data.type && data.path){
        data.success = true
        return resolve(data)
      }

      return reject( REGISTER_USER_FAILURE )
    })
    .catch((error) => {
      console.log('Error creating user.', error);
      return reject(REGISTER_USER_FAILURE)
    });
});}


///////////////////////////////////////////////////////////////////////////////////////////////
const endSession = (success, request) => {
    const myPromise = new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(success){
          return resolve({}) 
        }else{
          return reject({})  
        }
      }, 1000);
    });
    return myPromise;
  }

/************************************************************************************************/

export const POST = { postUserAppointment, endSession, startSession, registerUser, putStoreOwnerLocation }
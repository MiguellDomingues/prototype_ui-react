/***************************EDIT LOCATION ENDPOINT***********************/

const ENDPOINT_URL_LOCATION = 'http://localhost:8080/location/'

const PATCH_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to edit storeowner location"
}

const editStoreOwnerLocation = (location, key) => {

  console.log("edit storeowner location:")
  console.log("location: ", location)
  console.log("storeowner key: ", key)

  return new Promise( (resolve, reject) => { 

    //return random double between min and max inclusive/exclusive
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    const lat = location.LatLng.lat + getRandom(-2.5, 2.5)
    const lng = location.LatLng.lng + getRandom(-0.5, 0.5)


    const request_body = {
      storeowner_id:    key, 
      location:{
        ...location,
        LatLng: {
          lat: lat, //because i have no way yet of turning an address into a lat/lng, add a small randomized offset to the input lat/lng
          lng: lng
        },
      }
    }

    console.log("edit storeowner location SERVER REQUEST BODY:", request_body)

    fetch(ENDPOINT_URL_LOCATION, {
      method: 'PATCH',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("patch storeowner location SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data.location)
      }

      return reject(PATCH_STOREOWNER_LOCATION_FAILURE)
    })
    .catch((error) => {
      console.log('Error posting storeowner location.', error);
      return reject(PATCH_STOREOWNER_LOCATION_FAILURE)
    });

});}

/***************************EDIT APPOINTMENT ENDPOINT***********************/

const ENDPOINT_URL_APPOINTMENT = 'http://localhost:8080/appointment/'

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

    fetch(ENDPOINT_URL_APPOINTMENT, {
      method: 'PATCH',
      body: JSON.stringify(request_body),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("updateAppointmentStatus SERVER RESPONSE:", data)
      
      if(data){
        data.success = true
        return resolve(data)
      }

      return reject(PATCH_STOREOWNER_APPOINTMENT_FAILURE)
    })
    .catch((error) => {
      console.log('Error posting storeowner location.', error);
      return reject(PATCH_STOREOWNER_APPOINTMENT_FAILURE)
    });

});}

export const PATCH = { editStoreOwnerLocation, updateAppointmentStatus }
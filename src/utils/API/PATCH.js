/***************************CREATE LOCATION ENDPOINT***********************/

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
        return resolve(data)
      }

      return reject(PATCH_STOREOWNER_LOCATION_FAILURE)
    })
    .catch((error) => {
      console.log('Error posting storeowner location.', error);
      return reject(PATCH_STOREOWNER_LOCATION_FAILURE)
    });

});}

export const POST = { editStoreOwnerLocation }
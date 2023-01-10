
//const ENDPOINT_URL_LOCATION = 'http://localhost:8080/locations/'

/***************************DELETE LOCATION ENDPOINT***********************/

const DELETE_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to deletet storeowner location"
}

const deleteLocation = (loc_id, key,path) => {

  console.log("delete storeowner location:")
  console.log("location id: ", loc_id)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => { 

    const request_body = {
      loc_id:     loc_id,
      storeowner_id:    key,
    }
    
    console.log("deleteLocation: ", request_body)

      fetch(path + '?key=' + key, {
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

/***********************************************************************************


/***************************AUTHENTICATED USER POSTS ENDPOINT***********************/



const GET_USER_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired USER. please refresh your browser"
}

const fetchUserLocations = (key,path) => {

  return new Promise( (resolve, reject) => {

    fetch(path + '?key=' + key)
    .then((res) => res.json())
    .then((data) => {
      data.success = true
      console.log("fetch user posts: ", data)
      return resolve(data);
    })
    .catch((error) => {
      console.log('Error fetching user posts', error)
      return reject(GET_USER_POSTS_FAILURE);
      //
    });
  });
}

/************************************************************************************************/

/***************************GUEST USER POSTS ENDPOINT***********************/



const GET_GUEST_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired GUEST. please refresh your browser"
}

const fetchGuestLocations = (key,path) => {

  return new Promise( (resolve, reject) => {    

    fetch(path)
    .then((res) => { 
      return res.json()})
    .then((data) => {
      data.success = true
      console.log("fetch guest posts: ", data)
      return resolve(data);
    })
    .catch((error) => {
      console.log('Error fetching guest posts', error)
      return reject(GET_GUEST_POSTS_FAILURE);
      //
    });

  });

}

/************************************************************************************************/

/***************************AUTHENTICATED USER POSTS ENDPOINT***********************/

const GET_STOREOWNER_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired USER. please refresh your browser"
}

const fetchLocationsStoreOwner = (key,path) => {

  return new Promise( (resolve, reject) => {

    fetch(path + '?key=' + key)
    .then((res) => res.json())
    .then((data) => {
      data.success = true
      console.log("fetch storeowner posts: ", data)
      return resolve(data);
    })
    .catch((error) => {
      console.log('Error fetching storeowner posts', error)
      return reject(GET_STOREOWNER_POSTS_FAILURE);
    });
  });
}

/************************************************************************************************/

/***************************EDIT LOCATION ENDPOINT***********************/

const PATCH_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to edit storeowner location"
}

const editStoreOwnerLocation = (location, key,path) => {

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

    fetch(path + '?key=' + key, {
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

/***************************CREATE LOCATION ENDPOINT***********************/

const POST_STOREOWNER_LOCATION_FAILURE = {
  success:false,
  reason: "failed to post storeowner location"
}

const putStoreOwnerLocation = (location, key, path) => {

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

    fetch(path+ '?key=' + key, {
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


/************************************************************************************************/

export const locations = { 
    fetchGuestLocations, 
    fetchUserLocations, 
    fetchLocationsStoreOwner, 
    deleteLocation, 
    editStoreOwnerLocation, 
    putStoreOwnerLocation
}

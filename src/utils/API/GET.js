/***************************AUTHENTICATED USER POSTS ENDPOINT***********************/

const ENDPOINT_URL_USER = 'http://localhost:8080/locations'

const GET_USER_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired USER. please refresh your browser"
}

const fetchUserLocations = (key) => {

  return new Promise( (resolve, reject) => {

    fetch(ENDPOINT_URL_USER + '?key=' + key)
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

const ENDPOINT_URL_GUEST = 'http://localhost:8080/locations'

const GET_GUEST_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired GUEST. please refresh your browser"
}

const fetchGuestLocations = (key) => {

  return new Promise( (resolve, reject) => {    

    fetch(ENDPOINT_URL_GUEST )
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

const ENDPOINT_URL_STOREOWNER = 'http://localhost:8080/locations'

const GET_STOREOWNER_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired USER. please refresh your browser"
}

const fetchLocationsStoreOwner = (key) => {

  return new Promise( (resolve, reject) => {

    fetch(ENDPOINT_URL_STOREOWNER + '?key=' + key)
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

export const GET = { fetchGuestLocations,fetchUserLocations, fetchLocationsStoreOwner}

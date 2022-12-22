/***************************AUTHENTICATED USER POSTS ENDPOINT***********************/

const ENDPOINT_URL_USER = 'http://localhost:8080/posts/user'

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
      console.log("fetch miragejs user posts: ", data)
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

const ENDPOINT_URL_GUEST = 'http://localhost:8080/posts/guest'

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
      console.log("fetch miragejs guest posts: ", data)
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

  export const GET = { fetchGuestLocations,fetchUserLocations,}

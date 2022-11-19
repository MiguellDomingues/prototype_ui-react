const SUCCESS_POST_USER_APPOINTMENT = true

const POST_USER_APPOINTMENT_SUCCESS = {
  success:true,
  appointment: { id: 10, date: "10/10/22", start: "9:00", end: "10:00" }
}

const POST_USER_APPOINTMENT_FAILURE = {
  success:false,
  reason: "failed to post user appointment"
}

const PostUserAppointmentMock = (appointment, key) => {

  console.log("post user appointment mock:")
  console.log("appointment: ", appointment)
  console.log("key: ", key)

  return new Promise( (resolve, reject) => {     
    setTimeout(() => {    
      if(SUCCESS_POST_USER_APPOINTMENT  === true){
          return resolve(POST_USER_APPOINTMENT_SUCCESS);}
          else if(SUCCESS_POST_USER_APPOINTMENT  === false){
            return reject(POST_USER_APPOINTMENT_FAILURE)}
    }, 2000);
});}


    
/***************************AUTHENTICATED USER POSTS ENDPOINT***********************/

const SUCCESS_GET_USER_POSTS = true

const ENDPOINT_URL_USER = '/api/posts/user'

const GET_USER_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired USER. please refresh your browser"
}

/*
    mocking an async fetch
    returns a resolved() or rejected() promise with object containing relevant data
*/

const fetchUserPostsMock = (key) => {

  return new Promise( (resolve, reject) => {

    fetch(ENDPOINT_URL_USER)
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

    /*
    setTimeout(() => {    
      if(SUCCESS_GET_USER_POSTS === true){
        return resolve(GET_USER_POSTS_SUCCESS);}
          else if(SUCCESS_GET_USER_POSTS === false){
        return reject(GET_USER_POSTS_FAILURE)}
    }, 2000);
    */

  });
}

  /************************************************************************************************/
   
   
   
   
   /***************************GUEST USER POSTS ENDPOINT***********************/

const SUCCESS_GET_GUEST_POSTS = true

const ENDPOINT_URL_GUEST = '/api/posts/guest'

const GET_GUEST_POSTS_FAILURE = 
{
  success: false, 
  reason: "session expired GUEST. please refresh your browser"
}

/*
    mocking an async fetch
    returns a resolved() or rejected() promise with object containing relevant data
*/

const fetchGuestPostsMock = (key) => {

  return new Promise( (resolve, reject) => {    

    fetch(ENDPOINT_URL_GUEST)
    .then((res) => res.json())
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
/*
    setTimeout(() => {    
      if(SUCCESS_GET_GUEST_POSTS === true){
        return resolve(GET_GUEST_POSTS_SUCCESS);}
          else if(SUCCESS_GET_GUEST_POSTS === false){
        return reject(GET_GUEST_POSTS_FAILURE)}
      }, 2000);
*/
  });

}

  /************************************************************************************************/
   /***************************USER LOGGING ON ENDPOINT***********************/

  const SUCCESS_START_SESSION = true

  const START_SESSION_SUCCESS = 
  {
    type: 'user', 
    key: '2342fddddd2f1d131rf12', 
    path: '/user/'
  }

  const START_SESSION_FAILURE = {
    reason: "bad crddddeds"
  }

  const startSessionMock = (request) => {
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(SUCCESS_START_SESSION === true){ 
          return resolve(START_SESSION_SUCCESS) 
        }else if(SUCCESS_START_SESSION === false) { 
          return reject(START_SESSION_FAILURE)   
        }
      }, 1000);
  });}

  /************************************************************************************************/
  /***************************REGISTER NEW USER ACCOUNT ENDPOINT***********************/

  const SUCCESS_REGISTER_USER = true

  const USER_TYPES = {
    USER: "user",
    STOREOWNER: "storeowner",
    ADMIN: "admin"
  }

  const REGISTER_USER_SUCCESS = {
    type: USER_TYPES.STOREOWNER, 
    key: '2342f2f1d131rf12' , 
    path: '/' + USER_TYPES.STOREOWNER + '/'
  }
 
  const REGISTER_USER_FAILURE = {
    reason: "username taken"
  }

  const registerUserMock = (request) => {
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(SUCCESS_REGISTER_USER === true){ 
          return resolve(REGISTER_USER_SUCCESS) 
        }else if(SUCCESS_REGISTER_USER === false) { 
          return reject(REGISTER_USER_FAILURE)   
        }
      }, 1000);
  });}

/************************************************************************************************/

  const endSessionMock = (success, request) => {
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

  export const API = {
    fetchGuestPosts: (key) =>              fetchGuestPostsMock(key),
    fetchUserPosts:  (key) =>              fetchUserPostsMock(key),
    postAppointment: (appointment, key) => PostUserAppointmentMock(appointment,key),
    endSession:      (request) =>          endSessionMock(request),
    startSession:    (request) =>          startSessionMock(request),
    registerUser:    (request) =>          registerUserMock(request)
  }



  /*
order of operations is:
1) perform fetch/async operation
2) wrap the promise inside a resolver
3) consumer (wrapped inside Suspense) invokes .data()

we can also return data from multiple fetches to a single source
*/

/*
export async function fetchUserData(succeed, onSuccess , onFail, onFinish) {

  //return a promise object
  //let postsPromise = await fetchPostsMock(success);

  // can also return data from multiple async operations performed in parallel
  //return {
   // posts: postsPromise.posts,
  //};

  await fetchGuestPostsMock(succeed).then(onSuccess, onFail).finally(onFinish)  

}

*/

/* 
  get around the limitation of Suspense not handling exception-based failed async calls by returning the resolve object with a boolean flag :false
  instead of returning the rejected resolve object 


const GET_GUEST_POSTS_SUCCESS =
{
  posts: [
    {
        id: 0,
        address: "abc ave 123456",
        LatLng: { lat: 43.919617760254686, lng: -0.8844604492},
        info: "some info stuffs 0",
        icons: ["FaWrench", "FaOilCan", "FaCarBattery", "GiMechanicGarage"]
    },
    {
        id: 1,
        address: "abcd ave 123456",
        LatLng: { lat: 47.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 1",
        icons: ["MdLocalCarWash", "MdOutlineCarRepair", "GiMechanicGarage", "FaCarBattery"] 
    },
    {
        id: 2,
        address: "abcdef ave 123456",
        LatLng: { lat: 50.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 2",
        icons: ["MdOutlineCarRepair", "GiMechanicGarage", "FaWrench"] 
    }
  ],
  success: true, 
}

*/

/* 
  get around the limitation of Suspense not handling exception-based failed async calls by returning the resolve object with a boolean flag :false
  instead of returning the rejected resolve object 


const GET_USER_POSTS_SUCCESS =
{
  success: true, 
  posts: [
    {
        id: 0,
        address: " user abc ave 123456",
        LatLng: { lat: 43.919617760254686, lng: -0.8844604492},
        info: "some info stuffs 0",
        icons: ["FaWrench", "FaOilCan", "FaCarBattery", "GiMechanicGarage"],
        appointments: [
          { id: "0", loc_id: "0", date: "10/10/22", start: "9:00", end: "10:00" },
          { id: "1", loc_id: "0", date: "10/11/22", start: "11:00", end: "12:00" }

        ]
    },
    {
        id: 1,
        address: "USER abcd ave 123456",
        LatLng: { lat: 47.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 1",
        icons: ["MdLocalCarWash", "MdOutlineCarRepair", "GiMechanicGarage", "FaCarBattery"],
        appointments: [
          { id: "2", loc_id: "1", date: "10/11/22", start: "8:00", end: "9:00" },
        ] 
    },
    {
        id: 2,
        address: "USERRR abcdef ave 123456",
        LatLng: { lat: 50.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 2",
        icons: ["MdOutlineCarRepair", "GiMechanicGarage", "FaWrench"],
        appointments: [] 
    }
  ]
}

*/

/* 
const SUCCESS_GET_USER_APPOINTMENTS = true

  get around the limitation of Suspense not handling exception-based failed async calls by returning the resolve object with a boolean flag :false
  instead of returning the rejected resolve object 


const GET_USER_APPOINTMENTS_SUCCESS  =
{
  success: true, 
  posts: [
    {
        id: 0,
        appointments: [
          { id: 0, date: "10/10/22", start: "9:00", end: "10:00" },
          { id: 1, date: "10/11/22", start: "11:00", end: "12:00" }
        ]
    },
    {
        id: 1,
        appointments: [
          { id: 2, date: "10/11/22", start: "8:00", end: "9:00" },
        ] 
    },
    {
        id: 2,
        appointments: [] 
    }
  ]
}

const GET_USER_APPOINTMENTS_FAILURE  = 
{
  success: false, 
  reason: "failed to fetch user appointments"
}

const fetchUserAppointmentsMock = (key, id) => {
    return new Promise( (resolve, reject) => {     
      setTimeout(() => {    
        if(SUCCESS_GET_USER_APPOINTMENTS  === true){
            return resolve(GET_USER_APPOINTMENTS_SUCCESS);}
            else if(SUCCESS_GET_USER_APPOINTMENTS  === false){
              return reject(GET_USER_APPOINTMENTS_FAILURE)}
      }, 2000);
  });}
    
    */



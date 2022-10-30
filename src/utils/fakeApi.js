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
    mocking an async fetch
    returns a resolved() or rejected() promise with object containing relevant data
*/
 const fetchGuestPostsMock = (success, key) => {
    console.log("fetch posts for GUEST...");
    return new Promise( (resolve, reject) => {
        
      setTimeout(() => {
        console.log("fetched posts");
        if(success){
            return resolve({
            success: true,
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
            ]});}

            /* get around the limitation of Suspense not handling failed async calls by returning the object with a boolean flag */
            return reject({success: false, reason: "session expired. please log on again"})  

      }, 2000);
    });

  }

  const fetchUserPostsMock = (success, key) => {
    console.log("fetch posts for USER...");
    return new Promise( (resolve, reject) => {
        
      setTimeout(() => {
        console.log("fetched posts");
        if(success){
            return resolve({
            success: true,
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
            ]});}

            /* get around the limitation of Suspense not handling failed async calls by returning the object with a boolean flag */
            return reject({success: false, reason: "session expired. please log on again"})  

      }, 2000);
    });

  }

  const startSessionMock = (success, request) => {
    console.log("")
    const myPromise = new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(success){
          return resolve({...request, type: 'user', key: '2342f2f1d131rf12' , path: '/user/'}) 
        }else{
          return reject({reason: "bad creds"})  
        }
      }, 1000);
    });
    return myPromise;
  }

  const registerUserMock = (success, request) => {
    const myPromise = new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(success){
          return resolve({type: request.type, key: '2342f2f1d131rf12' , path: '/' + request.type + '/'}) 
        }else{
          return reject({reason: "username taken"})  
        }
      }, 1000);
    });
    return myPromise;
  }

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
    fetchGuestPosts: (key) =>       fetchGuestPostsMock(true, key),
    fetchUserPosts:  (key) =>       fetchUserPostsMock(true, key),
    endSession:      (request) =>   endSessionMock(true, request),
    startSession:    (request) =>   startSessionMock(true, request),
    registerUser:    (request) =>   registerUserMock(true, request)
  }




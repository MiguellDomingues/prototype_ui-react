/*
order of operations is:
1) perform fetch/async operation
2) wrap the promise inside a resolver
3) consumer (wrapped inside Suspense) invokes .data()

we can also return data from multiple fetches to a single source
*/

export async function  fetchProfileData(succeed, onSuccess , onFail, onFinish) {

  //return a promise object
  //let postsPromise = await fetchPostsMock(success);

  // can also return data from multiple async operations performed in parallel
  //return {
   // posts: postsPromise.posts,
  //};

  await fetchPostsMock(succeed).then(onSuccess, onFail).finally(onFinish)  

}
  
/*
    mocking an async fetch
    returns a resolved() or rejected() promise with object containing relevant data
*/
  function fetchPostsMock(success) {
    console.log("fetch posts...");
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




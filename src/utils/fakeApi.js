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
                x: 34.234234,
                y: 33.2342343,
            },
            {
                id: 1,
                address: "abcd ave 123456",
                x: 35.234234,
                y: 36.2342343,
            },
            {
                id: 2,
                address: "abcdef ave 123456",
                x: 37.234234,
                y: 38.2342343,
            }
            ]});}

            /* get around the limitation of Suspense not handling failed async calls by returning the object with a boolean flag */
            return reject({success: false, reason: "session expired. please log on again"})  

      }, 2000);
    });

  }




/*
order of operations is:
1) perform fetch/async operation
2) wrap the promise inside a resolver
3) consumer (wrapped inside Suspense) invokes .data()

we can also return data from multiple fetches to a single source
*/

export function fetchProfileData(success) {

    //return a promise object
    let postsPromise = fetchPostsMock(success);

    // can also return data from multiple async operations performed in parallel
    return {
      posts: wrapPromise(postsPromise),
    };

  }
  
  function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
            //console.log("pending...")
          throw suspender;
        } else if (status === "error") {
           // console.log("err", result)
           /*  
                we get around the limitation of Suspense not handling status = error by RETURNING a result and handling it inside the consumer component
                this means we need to append a boolean flag to return objects which gets consumed by wrapped component
                otherwise if we throw the result, we need to wrap Suspense inside a class Component that uses onError lifecycle methods
           */
          return result;
        } else if (status === "success") {
           // console.log("success")
          return result;
        }
      }
    };
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




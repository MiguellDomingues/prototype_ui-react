const getSuspender = (promise) => {
    let status = "pending";
    let response;
  
    console.log("get suspender start")
  
    const suspender = promise.then(
      (res) => {
        status = "success";
        response = res;
      },
      (err) => {
        status = "error";
        response = err;
      }
    );
  
    console.log("get suspender end")
  
    const read = () => {
      console.log("read start")
      switch (status) {
        case "pending":
            console.log("case pending")
          throw suspender;
        case "error":
            console.log("case error")
          throw response;
        default:
          return response;
      }
    };
  
    console.log("returning the read function")
    return { read };
  };
  
  export default getSuspender;
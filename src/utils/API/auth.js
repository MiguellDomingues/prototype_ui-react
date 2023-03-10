/***************************USER LOGGING ON ENDPOINT***********************/
//const ENDPOINT_URL_AUTHENTICATE = 'http://localhost:8080/auth'

const START_SESSION_FAILURE = {
  reason: "bad crddddeds"
}

const startSession = (request,path) => {
  console.log("---logging on---", request, path)

  return new Promise( (resolve, reject) => {

    const request_body = {
      user_name: request.username,
      password: request.password
    }

    fetch(path, {
      method: 'POST',
      body: JSON.stringify(request_body),
      // need to set header to 'application/json' to send POST methods
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("RESPONSE FROM SERVER IN AUTHENTICATE: ", data);

      if(data.key && data.type && data.path){
        data.success = true
        return resolve(data)
      }

      return reject(START_SESSION_FAILURE)
    })
    .catch((error) => {
      console.log('Error logging on.', error);
      return reject(START_SESSION_FAILURE)
    });

  })
;}

/************************************************************************************************/

/***************************REGISTER NEW USER ACCOUNT ENDPOINT***********************/

//const ENDPOINT_URL_CREATEUSER = 'http://localhost:8080/register'

const REGISTER_USER_FAILURE = {
  reason: "username taken"
}

const registerUser = (request,path) => {

  console.log("---creating new user---", request)

  return new Promise( (resolve, reject) => {

    const request_body = {
      type: request.type,
      user_name: request.username,
      password: request.password
    }

    fetch(path, {
      method: 'POST',
      body: JSON.stringify(request_body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(((res) => res.json()))
    .then((data) => {

      console.log("RESPONSE FROM SERVER IN createuser: ", data);

      if(data.key && data.type && data.path){
        data.success = true
        return resolve(data)
      }

      return reject( REGISTER_USER_FAILURE )
    })
    .catch((error) => {
      console.log('Error creating user.', error);
      return reject(REGISTER_USER_FAILURE)
    });
});}


///////////////////////////////////////////////////////////////////////////////////////////////
const endSession = (success, request) => {
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

/************************************************************************************************/

export const auth = { startSession, registerUser, endSession}
/***************************FETCH CONFIGS***********************/

const ENDPOINT_URL_CONFIGS = 'http://localhost:8080/configs'

const GET_CONFIGS_FAILURE = 
{
  success: false, 
  reason: "fetching config failed"
}

const fetchClientConfigs = (key) => {

  return new Promise( (resolve, reject) => {

    fetch(ENDPOINT_URL_CONFIGS)
    .then((res) => res.json())
    .then((data) => {
      data.success = true
      console.log("fetch config: ", data)
      return resolve(data);
    })
    .catch((error) => {
      console.log('Error fetching configs', error)
      return reject(GET_CONFIGS_FAILURE);
      //
    });
  });
}

export const configs = { fetchClientConfigs }


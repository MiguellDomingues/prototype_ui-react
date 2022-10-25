import getSuspender from "./getSuspender";

function fetchData(url) {

  console.log("fetchData before fetch")
  const promise = fetch(url)
    .then( (res) => a(res)  )
    .then( (res) => b(res) );

    console.log("fetchData after fetch")

  return getSuspender(promise);
}

/*

*/

function a(res){
  console.log("first then()", res)
  return res.json()
}

function b(res){
  console.log("second then()", res)
  return res.message
}

export default fetchData;

const SUCCESS_GET_GUEST_POSTS = true
const SUCCESS_GET_USER_POSTS = true

const GET_GUEST_POSTS_SUCCESS = [
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
  ]

  const GET_GUEST_POSTS_FAILURE_MSG = "session expired. please log on again"

  const GET_USER_POSTS_SUCCESS = [
    {
        id: 0,
        address: "abc ave 123456",
        LatLng: { lat: 43.919617760254686, lng: -0.8844604492},
        info: "some info stuffs 0",
        icons: ["FaWrench", "FaOilCan", "FaCarBattery", "GiMechanicGarage"],
        appointments:[
          {
            id: 0,
            date: "9/9/2022",
            time_start: "9am",
            time_end: "10am"
          },
          {
            id: 3,
            date: "9/10/2022",
            time_start: "12am",
            time_end: "10am",
          }
        ]
    },
    {
        id: 1,
        address: "abcd ave 123456",
        LatLng: { lat: 47.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 1",
        icons: ["MdLocalCarWash", "MdOutlineCarRepair", "GiMechanicGarage", "FaCarBattery"],
        appointments:[] 
    },
    {
        id: 2,
        address: "abcdef ave 123456",
        LatLng: { lat: 50.919617760254686, lng: -0.7844604492},
        info: "some info stuffs 2",
        icons: ["MdOutlineCarRepair", "GiMechanicGarage", "FaWrench"],
        appointments:[]  
    }
    ]

const GET_USER_POSTS_FAILURE_MSG = "session expired. please log on again"

const fakeData = (function () {
    
    return {
        GET_GUEST_POSTS_SUCCESS,
        GET_GUEST_POSTS_FAILURE_MSG,
        GET_USER_POSTS_SUCCESS,
        GET_USER_POSTS_FAILURE_MSG,
        SUCCESS_GET_GUEST_POSTS,
        SUCCESS_GET_USER_POSTS
    }
  })();


export default fakeData
 

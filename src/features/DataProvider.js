import React from "react";
import  { API } from '../utils/fakeApi'
import  { useAuth } from './AuthProvider'

const DataContext = React.createContext(null);

export const DataProvider = ({ children }) => {

  const { token } = useAuth()

  // the only way i can really put data in here is to make sure it does not redraw
  // entire UI when a single part of the UI changes

  //because this wraps the entire app, any updates will redraw ENTIRE UI\
  // the reason I set this is to prevent needing to RELOAD DATA when user navigates
  // diff pages of app
  // add a check to see if data was fetched already (or some time elapased, to refresh)
  // prevents needing to reload as i navigate
  
  //const [data, setData] = React.useState({});

  //return a promise object
    //let postsPromise = await fetchPostsMock(success);
  
    // can also return data from multiple async operations performed in parallel
    //return {
     // posts: postsPromise.posts,
    //};

  const handleFetchLocations = async (onSuccess , onFail, onFinish) => {
    console.log("DataProvider/fetchUserPageData: ", token)
    
    // if there is no token, then we invoke fetching authenticated user posts
    if(!token){
      await API.fetchGuestPosts(token).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)
      //...otherwise we fetch USER posts  
    }else if(token && token.type === "user"){
      await API.fetchUserPosts(token.key).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
    }else{
      console.log("error in dataprovider: no API for user type defined")
    } 
  }

  const handlePostAppointment = async (payload, onSuccess , onFail, onFinish) => {
    console.log("DataProvider/handlePostAppointment APT: ", payload)
    //await API.fetchGuestPosts(token).then(onSuccess, onFail).finally(onFinish)
    
    if(!token){
      console.log("error:, user has no token set")
      //await API.fetchGuestPosts(token).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
    }else if(token && token.type === "user"){
      await API.postAppointment(payload, token.key).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
    }else{
      console.log("error in handlePostAppointment: no API for user type defined")
    } 
  }

  const handleDeleteAppointment = async (payload, onSuccess , onFail, onFinish) => {
    console.log("handleDeleteAppointment APT: ", payload)

    if(!token){
      console.log("error:, user has no token set")
      //await API.fetchGuestPosts(token).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
    }else if(token && token.type === "user"){
      await API.deleteAppointment(payload, token.key).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
    }else{
      console.log("error in handleDeleteAppointment: no API for user type defined")
    }
    
  }



  const successCB = (onSuccess) => {
    return (r) =>{ 
      console.log("example of Data Provider handling callout results first")
      console.log("it can reshape data (like removing 'success' prop) to make it easier to consume ")
      return onSuccess(r)
    }
  }

  const failureCB = (onFail) => {
    return (r) =>{ 
      console.log("DP failure")
      return onFail(r)
    }
  }



  const value = {
    //data,
    onFetchLocations:   handleFetchLocations,
    onPostAppointment:  handlePostAppointment,
    onDeleteAppointment:handleDeleteAppointment
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useAPI = () => {
  return React.useContext(DataContext);
};
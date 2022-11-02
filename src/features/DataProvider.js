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
  
  const [data, setData] = React.useState({});

  //return a promise object
    //let postsPromise = await fetchPostsMock(success);
  
    // can also return data from multiple async operations performed in parallel
    //return {
     // posts: postsPromise.posts,
    //};

  const handleFetch = async (onSuccess , onFail, onFinish) => {
    console.log("DataProvider/fetchUserPageData: ", token)
    //await API.fetchGuestPosts(token).then(onSuccess, onFail).finally(onFinish)  
    await API.fetchGuestPosts(token).then(successCB(onSuccess), failureCB(onFail) ).finally(onFinish)  
  }

  const successCB = (onSuccess) => {
    return (r) =>{ 
      console.log("example of Data Provider handling fetch results first")
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
    data,
    onFetch:handleFetch
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
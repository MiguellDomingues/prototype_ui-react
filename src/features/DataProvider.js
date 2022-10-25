import React from "react";

const DataContext = React.createContext(null);

export const DataProvider = ({ children }) => {

  

  const [data, setData] = React.useState({});


  const fakeFetch = (request) => {
    const success = true
    const myPromise = new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(success){
          return resolve({type: "noauth", data: [{address: "abc", geocoords: {x: 34.2342423, y: 33.4234234234}}] }) 
        }else{
          return reject({reason: "server down"})  
        }
      }, 1000);
    });
    return myPromise;
  }



  const handleGetData = async (request, callback) => { 
    await fakeFetch(request).then(setData, callback)
    
    /*
    const guestData = [
      {address: "abc", geocoords: {x: 34.2342423, y: 33.4234234234} },
      {address: "def", geocoords: {x: 34.2342423, y: 33.4234234234} },
      {address: "ghi", geocoords: {x: 34.2342423, y: 33.4234234234} },
      {address: "jkl", geocoords: {x: 34.2342423, y: 33.4234234234} },
      {address: "mno", geocoords: {x: 34.2342423, y: 33.4234234234} },
  ]*/

    
  };

  const value = {
    data,
    onFetch:handleGetData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  return React.useContext(DataContext);
};

/*
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = React.useState(null);
  
      const fakeAuth = (request) => {
        const success = true
        const myPromise = new Promise( (resolve, reject) => {
          setTimeout(() => {
            if(success){
              return resolve({...request, type: 'user', key: '2342f2f1d131rf12' , path: '/user/'}) 
            }else{
              return reject({reason: "bad creds"})  
            }
          }, 1000);
        });
        return myPromise;
      }
  
      const fakeRegister = (request) => {
        const success = true
        const myPromise = new Promise( (resolve, reject) => {
          setTimeout(() => {
            if(success){
              return resolve({type: request.type, key: '2342f2f1d131rf12' , path: '/' + request.type + '/'}) 
            }else{
              return reject({reason: "username taken"})  
            }
          }, 1000);
        });
        return myPromise;
      }
  
    const handleLogin = async (request, callback) => { 
      await fakeAuth(request).then(setToken, callback)  
    };
  
    const handleLogout = () => {
      console.log("handle logout")
      setToken(null);
    };
  
    const handleRegistration  = async (request, callback) => {
      console.log("handle regis: ", request)
      //const token = await fakeAuth();
      //setToken(token);
      await fakeRegister(request).then(setToken, callback)
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
      onRegistration: handleRegistration
    };
  
    console.log("auth provider:", value)
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  return React.useContext(AuthContext);
};

*/
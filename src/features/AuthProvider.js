
import React from "react";

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


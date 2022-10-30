
import React from "react";
import { API } from '../utils/fakeApi'

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

    const [token, setToken] = React.useState(null);

    const { startSession, registerUser, endSession } = API
  
    /* PUBLIC FUNCTIONS */
    const handleLogin = async (request, callback) => { 
      //await fakeAuth(true, request).then(setToken, callback)  
      await startSession(request).then(setToken, callback) 
    };
  
    const handleLogout = () => {
      console.log("handle logout")
      //endSession()...
      setToken(null);
    };
  
    const handleRegistration  = async (request, callback) => {
      console.log("handle regis: ", request)
      //const token = await fakeAuth();
      //setToken(token);
      await registerUser(request).then(setToken, callback)
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


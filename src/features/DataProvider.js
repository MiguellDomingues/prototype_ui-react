import React from "react";

import  { useAuth } from './AuthProvider'

import { POST }   from '../utils/API/POST'
import { GET }    from '../utils/API/GET'
import { DELETE } from '../utils/API/DELETE'

const DataContext = React.createContext(null);

export const DataProvider = ({ children }) => {

  const { token } = useAuth()

  const value = {

    fetchLocationsGuest: async function(onSuccess , onFail, onFinish){
      await GET.fetchGuestLocations(token).then(onSuccess, onFail).finally(onFinish)  
    }, 

    fetchLocationsUser: async function(onSuccess , onFail, onFinish){
      await GET.fetchUserLocations(token.key).then(onSuccess, onFail).finally(onFinish)  
    },
    
    fetchLocationsStoreOwner: async function(onSuccess , onFail, onFinish){
      await GET.fetchLocationsStoreOwner(token.key).then(onSuccess, onFail).finally(onFinish)  
    }, 

    createAppointment:  async function(payload, onSuccess , onFail, onFinish){
      await POST.postUserAppointment(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    createLocation:  async function(payload, onSuccess , onFail, onFinish){
      await POST.putStoreOwnerLocation(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    deleteAppointment: async function(payload, onSuccess , onFail, onFinish){
      await DELETE.deleteUserAppointment(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

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
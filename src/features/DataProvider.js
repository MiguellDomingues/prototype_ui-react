import React from "react";

import  { useAuth } from './AuthProvider'
import  { useConfig } from './AuthProvider'

import { locations }   from '../utils/API/locations'
import { appointments }    from '../utils/API/appointments'

const DataContext = React.createContext(null);

export const DataProvider = ({ children }) => {

  
  const { token } = useAuth()
  const { config } = useConfig()

  const locations_path = config ? `${config.DOMAIN}${config.ENDPOINT_URL_LOCATION}` : ''
  const appointments_path = config ? `${config.DOMAIN}${config.ENDPOINT_URL_APPOINTMENT}` : ''

  console.log("SETTING DATACONTEXT PATHS", config)

  const value = {

    config, // KEEP THIS HERE BECAUSE THE GUEST CONTEXT REFERENCES THIS FOR LOADING. otherwise the guest context tries to fetch posts without the endpoint from /configs

    fetchLocationsGuest: async function(onSuccess , onFail, onFinish){
      await locations.fetchGuestLocations(token,locations_path).then(onSuccess, onFail).finally(onFinish)  
    }, 

    fetchLocationsUser: async function(onSuccess , onFail, onFinish){
      await locations.fetchUserLocations(token.key,locations_path).then(onSuccess, onFail).finally(onFinish)  
    },
    
    fetchLocationsStoreOwner: async function(onSuccess , onFail, onFinish){
      await locations.fetchLocationsStoreOwner(token.key,locations_path).then(onSuccess, onFail).finally(onFinish)  
    }, 

    createAppointment:  async function(payload, onSuccess , onFail, onFinish){
      await appointments.postUserAppointment(payload, token.key,appointments_path).then(onSuccess, onFail).finally(onFinish)  
    },

    createLocation:  async function(payload, onSuccess , onFail, onFinish){
      await locations.putStoreOwnerLocation(payload, token.key,locations_path).then(onSuccess, onFail).finally(onFinish)  
    },

    deleteAppointment: async function(payload, onSuccess , onFail, onFinish){
      await appointments.deleteUserAppointment(payload, token.key,appointments_path).then(onSuccess, onFail).finally(onFinish)  
    },
    deleteLocation: async function(payload, onSuccess , onFail, onFinish){
      await locations.deleteLocation(payload, token.key,locations_path).then(onSuccess, onFail).finally(onFinish)  
    },

    editStoreOwnerLocation: async function(payload, onSuccess , onFail, onFinish){
      await locations.editStoreOwnerLocation(payload, token.key,locations_path).then(onSuccess, onFail).finally(onFinish)  
    },

    updateAppointmentStatus: async function(payload, onSuccess , onFail, onFinish){
      await appointments.updateAppointmentStatus(payload, token.key,appointments_path).then(onSuccess, onFail).finally(onFinish)  
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
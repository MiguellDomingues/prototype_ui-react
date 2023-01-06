import React from "react";

import  { useAuth } from './AuthProvider'
import  { useConfigs } from './AuthProvider'

import { locations }   from '../utils/API/locations'
import { appointments }    from '../utils/API/appointments'

const DataContext = React.createContext(null);

export const DataProvider = ({ children }) => {

  
  const { token } = useAuth()

  /*
  const { configs } = useAuth()

  //const ENDPOINT_URL_LOCATION = 'http://localhost:8080/locations/'

const { ENDPOINT_URL_LOCATION,  DOMAIN} = useConfig().configs
//const DATABASE_URI      = `mongodb://${DATABASE_DOMAIN}/${DATABASE_NAME}`;
const PATH = 'DOMAIN'
*/

  const value = {

    fetchLocationsGuest: async function(onSuccess , onFail, onFinish){
      await locations.fetchGuestLocations(token).then(onSuccess, onFail).finally(onFinish)  
    }, 

    fetchLocationsUser: async function(onSuccess , onFail, onFinish){
      await locations.fetchUserLocations(token.key).then(onSuccess, onFail).finally(onFinish)  
    },
    
    fetchLocationsStoreOwner: async function(onSuccess , onFail, onFinish){
      await locations.fetchLocationsStoreOwner(token.key).then(onSuccess, onFail).finally(onFinish)  
    }, 

    createAppointment:  async function(payload, onSuccess , onFail, onFinish){
      await appointments.postUserAppointment(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    createLocation:  async function(payload, onSuccess , onFail, onFinish){
      await locations.putStoreOwnerLocation(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    deleteAppointment: async function(payload, onSuccess , onFail, onFinish){
      await appointments.deleteUserAppointment(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },
    deleteLocation: async function(payload, onSuccess , onFail, onFinish){
      await locations.deleteLocation(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    editStoreOwnerLocation: async function(payload, onSuccess , onFail, onFinish){
      await locations.editStoreOwnerLocation(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
    },

    updateAppointmentStatus: async function(payload, onSuccess , onFail, onFinish){
      await appointments.updateAppointmentStatus(payload, token.key).then(onSuccess, onFail).finally(onFinish)  
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

import { DataContextProvider, useDataContext  } from './DataContext'
import { AppointmentContextProvider, useAppointmentContext  } from './AppointmentContext'
import { FilterContextProvider, useFilterContext  } from './FilterContext'
import { LocationContextProvider, useLocationContext  } from './LocationContext'

import  UserPageTEST  from './UserPage'

const UserPageContextTEST = () =>{
console.log("//////////////////////TESTING////////////////////////////")
    const value ={
        useDataContext: () => useDataContext,
        useAppointmentContext: useAppointmentContext,
        useFilterContext: useFilterContext,
        useLocationContext : useLocationContext 
    }

    return<>
        <DataContextProvider>
           <AppointmentContextProvider>
               <FilterContextProvider>
                        <LocationContextProvider>
                                <UserPageTEST context={value}/>
                        </LocationContextProvider> 
                </FilterContextProvider>          
                </AppointmentContextProvider>        
        </DataContextProvider>
        </>
}

export default UserPageContextTEST
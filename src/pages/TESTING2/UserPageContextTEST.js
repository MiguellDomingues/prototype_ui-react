
import { useDataContext  } from './useDataContext'
import { useAppointmentContext  } from './AppointmentContext'
import {  useFilterContext  } from './FilterContext'
import { useLocationContext  } from './LocationContext'

import  UserPageTEST  from './UserPage'

const UserPageContextTEST = () =>{
console.log("//////////////////////TESTING////////////////////////////")

    const value ={
    }

    return<>
        
         <UserPageTEST context={value}/>
                        
        </>
}

export default UserPageContextTEST
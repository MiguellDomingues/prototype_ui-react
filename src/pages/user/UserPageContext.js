
import { UserContextProvider  } from './UserContextProvider'
import  UserPage  from './UserPage'

const UserPageContext = () =>{

    return<> <UserContextProvider>
                <UserPage/>
        </UserContextProvider></>
}

export default UserPageContext
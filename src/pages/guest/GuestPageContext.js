
import { GuestContextProvider  } from './GuestContextProvider'
import  GuestPage  from './GuestPage'

const GuestPageContext = () =>{

    return<> <GuestContextProvider>
                <GuestPage/>
        </GuestContextProvider></>
}

export default GuestPageContext
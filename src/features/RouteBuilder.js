
import { Routes, Route} from "react-router-dom";

import GuestPageContext from '../pages/guest/GuestPageContext'
import UserPage from '../pages/user/UserPage'

import StoreOwnerPage from '../pages/storeowner/StoreOwnerPage'
import AdminPage from '../pages/admin/AdminPage'
import Authenticate from '../pages/auth/authenticate'
import Register from '../pages/auth/register'
import NotFound from '../pages/error/notfound'
import About from '../pages/about/About'
import Profile from '../pages/profile/Profile'

import { useAuth } from './AuthProvider'

import { Navigate } from 'react-router-dom';

const RouteBuilder = ( ) =>{

    return(
        <><Routes>
           
            <Route index path="/user/" element={  <PrivateRoute> <UserPage/> </PrivateRoute> } />
            <Route index path="/storeowner/" element={ <PrivateRoute> <StoreOwnerPage/> </PrivateRoute>} />
            <Route index path="/admin/" element={ <PrivateRoute> <AdminPage/> </PrivateRoute>} />         
            <Route path="/:type/profile" element={<PrivateRoute> <Profile/> </PrivateRoute>} />
       
            <Route path="/" element={ <GuestPageContext/> } />
         
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Authenticate/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />

        </Routes></>)
}


const PrivateRoute = ({ children }) =>{

    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}

export default RouteBuilder   
            
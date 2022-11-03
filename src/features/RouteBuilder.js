
import { Routes, Route} from "react-router-dom";

import GuestPageContext from '../pages/guest/GuestPageContext'
import UserPageContext from '../pages/user/UserPageContext'

import UserPageTEST from '../pages/TESTING2/UserPage'


import StoreOwnerPage from '../pages/storeowner/StoreOwnerPage'
import AdminPage from '../pages/admin/AdminPage'
import Authenticate from '../pages/auth/authenticate'
import Register from '../pages/auth/register'
import NotFound from '../pages/error/notfound'
import About from '../pages/about/About'
import Profile from '../pages/profile/Profile'

import { useAuth } from './AuthProvider'

import { Navigate } from 'react-router-dom';

//lazy loading: react only loads a page into memory when its required
//normally, it builds the routes and associates components in memory with that route
//const UserPage = React.lazy(() => import('../pages/user/UserPage'));
//const StoreOwnerPage = React.lazy(() => import('../pages/storeowner/StoreOwnerPage'));
//const AdminPage = React.lazy(() => import('../pages/admin/AdminPage'));
//<UserPageContextTEST/>
//<UserPageContext/>
//<UserPage/>

const RouteBuilder = ( ) =>{

    return(
        <><Routes>
           
<Route index path="/user/" element={  <PrivateRoute> <UserPageContext/> </PrivateRoute> } />
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

/*

            <Route index path="/user/"> 
                <PrivateRoute><UserPage/> </PrivateRoute>
                </Route>
                <Route index path="/storeowner/"> 
                <PrivateRoute> <StoreOwnerPage/> </PrivateRoute>
                </Route>
                <Route index path="/admin/"> 
                <PrivateRoute><AdminPage/>  </PrivateRoute>
                </Route>      
                <Route path="/:type/profile"> 
                <PrivateRoute> <Profile/> </PrivateRoute>
                </Route> 
    */
                
            
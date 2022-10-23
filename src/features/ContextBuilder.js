
import { Routes, Route} from "react-router-dom";

import GuestPage from '../pages/guest/GuestPage'
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

import React, { Suspense, Children, cloneElement } from 'react'

//lazy loading: react only loads a page into memory when its required
//normally, it builds the routes and associates components in memory with that route
//const UserPage = React.lazy(() => import('../pages/user/UserPage'));
//const StoreOwnerPage = React.lazy(() => import('../pages/storeowner/StoreOwnerPage'));
//const AdminPage = React.lazy(() => import('../pages/admin/AdminPage'));

const ContextBuilder = ( ) =>{

    return(
        <><Routes>
           
            <Route index path="/user/" element={  <PrivateRoute> <UserPage/> </PrivateRoute> } />
            <Route index path="/storeowner/" element={ <PrivateRoute> <StoreOwnerPage/> </PrivateRoute>} />
            <Route index path="/admin/" element={ <PrivateRoute> <AdminPage/> </PrivateRoute>} />
            
            <Route path="/:type/profile" element={<PrivateRoute> <Profile/> </PrivateRoute>} />

            <Route path="/" element={<GuestPage/>} />
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

export default ContextBuilder

/*<Route index path="/user/" element={  
                    <PrivateRoute> 
                        <Suspense fallback={<div>Loading...</div>}> 
                            <UserPage/> 
                        </Suspense> 
                </PrivateRoute>} />
                
         /*
    const buildAuthRoute = (token) => {
        
        if(!token){
            return <Navigate to="/login" replace />;
        }else if(token.type === 'user'){
            return <UserPage/> 
        }else if(token.type === 'storeowner'){
            return <StoreOwnerPage/>
        }else if(token.type === 'admin'){
            return <AdminPage/>
        }else{
            return <NotFound/>
        }

         <Route index path="/:type/" element={  buildAuthRoute(token)  } />
    }
    */       
                
            
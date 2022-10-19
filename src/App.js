import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import GuestPage from './pages/guest/GuestPage'
import UserPage from './pages/user/UserPage'
import StoreOwnerPage from './pages/storeowner/StoreOwnerPage'
import AdminPage from './pages/admin/AdminPage'
import Authenticate from './pages/auth/authenticate'
import Register from './pages/auth/register'
import NotFound from './pages/error/notfound'

import './App.css';

/*
(routes)
(public routes props=token)
(route)()

(/routes)
*/

function App() {

  return (<>
    <Router>
      <Routes>
        {/*
        parse the current url
          - read type/key off of params

        dynamically build route 

        change routes to token


        staticly typed routes
        i should change this to dynmaic routing 
          build routes based on usertype 
            usertype: user, route: /user/:apiKey"
              - lazy load the components
              - pass as props

        privateroute()
          dynamicRoute (props=type, token /)

        dynamicRoute()
          parse token 
          route path="token path"
          private routes props= {token}



          private dyanmic routebuilder:
            - iterate through children elements, check path prop
            parseToken // check for match by the path string prop
              type == 'user' return children -> contains(/user/:apiKey) -> <Route path="/user/:apiKey" element={<UserPage/>} />
              type == 'storeowner' return children -> contains(/storeowner/:apiKey) -> <Route path="/user/:apiKey" element={<UserPage/>} />
              type == 'unauth' return children -> contains(/) -> <Route path="/" element={<GuestUserPage/>} />
            
          userpage builder ()

          
        
        Route path="/user/:apiKey" element={<UserPageBuilder props=type,key/>} />
        */}
          <Route path="/user/:apiKey" element={<UserPage/>} />
          <Route path="/storeowner/:apiKey" element={<StoreOwnerPage/>} />
          <Route path="/admin/:apiKey" element={<AdminPage/>} />
        {/*public routes*/}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Authenticate/>} />
        <Route path="/" element={<GuestPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>  
    </Router>
  </>);
}

export default App;

/*

<Route path="/user/:apikey" element={<UserPage/>}   />


<Route path="/">
          <GuestPage/>
        </Route>
        <Route path="/user">
          <UserPage/>
        </Route>   
        <Route path="/storeowner">
          <StoreOwnerPage/>
        </Route>
      </Routes>  



 <Route path="/" element={<TodoContainer/>}/>
              <Route path="about/*" element={<About/>}/>
              <Route path="*" element={<NotMatch/>}/>



 <Router>
    <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
*/

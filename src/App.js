//import React from "react";

//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';

import { Container, Row, Col } from "react-grid-system";

import Header from './components/header'
import Footer from './components/footer'

import ContextBuilder from './features/ContextBuilder'

import './App.css';

function App() {

  return (<>

  <div className="app_container">
        <div className="row header_child">
          <Header/>
        </div>
        <div className="row content_child">
          <ContextBuilder/>
        </div>
        <div className="row footer_child">
          <Footer/>
        </div>
  </div>

  </>);
}

export default App;

/*

<Container >
<Row debug>
   header
  </Row> 
<Row debug>
  
        <Col debug>
          gdfgfdfdgdf
        </Col>
          <Col debug>
            <Row debug>A</Row>
            <Row debug>B</Row>
            <Row debug>C</Row>
            <Row debug>D</Row>
            <Row debug>E</Row>
            <Row debug>F</Row>
            <Row debug>G</Row>
          </Col>
        
      </Row>
  <Row debug>
    footer
  </Row>
</Container>
  

<Container>
        <Row>
          <Col>
            <h1>Hello CodeSandbox</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Start editing to see some magic happen!</h2>
          </Col>
        </Row>
        <Row align="stretch" justify="initial">
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
        </Row>
        <Row align="stretch" justify="initial">
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
          <ColButton label="Hello world" />
        </Row>
      </Container>
*/


/*

<Container style={ {border: "1px solid #ccc" , maxWidth: "100%", maxHeight: "100%", height: "85%"} }>

        <Row style={ {border: "1px dashed green" , maxWidth: "100%", maxHeight: "25%", height: "15%"} } >
          <Header/>
        </Row>

        <Row style={ { border: "1px dashed green" , maxWidth: "100%", maxHeight: "70%", height: "70%",box_sizing: "border-box"} } >
          <ContextBuilder/>
        </Row>

        <Row style={ {border: "1px dashed red" , margin:"0px", maxWidth: "100%", maxHeight: "25%", height: "15%"} }>
          <Footer/>
        </Row>










import { Routes, Route} from "react-router-dom";
import GuestPage from './pages/guest/GuestPage'
import UserPage from './pages/user/UserPage'
import StoreOwnerPage from './pages/storeowner/StoreOwnerPage'
import AdminPage from './pages/admin/AdminPage'
import Authenticate from './pages/auth/authenticate'
import Register from './pages/auth/register'
import NotFound from './pages/error/notfound'
import About from './pages/about/About'
import Profile from './pages/profile/Profile'

<Routes>
            <Route index path="/user/" element={<UserPage/>} />
            <Route index path="/storeowner/" element={<StoreOwnerPage/>} />
            <Route index path="/admin/" element={<AdminPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/" element={<GuestPage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Authenticate/>} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>*/ 


/*
<Router>
      <Routes>
        <Route index path="/user/:apiKey" element={<UserPage/>} />
        <Route index path="/storeowner/:apiKey" element={<StoreOwnerPage/>} />
        <Route index path="/admin/:apiKey" element={<AdminPage/>} />
        
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Authenticate/>} />
        <Route path="/" element={<GuestPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>  
    </Router>
*/


  /*
  return (<>
    <Router>
      <Routes>
        <Route index path="/user/:apiKey" element={<UserPage/>} />
        <Route index path="/storeowner/:apiKey" element={<StoreOwnerPage/>} />
        <Route index path="/admin/:apiKey" element={<AdminPage/>} />
        
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Authenticate/>} />
        <Route path="/" element={<GuestPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>  
    </Router>
  </>);
  */


 /*
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
        */

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

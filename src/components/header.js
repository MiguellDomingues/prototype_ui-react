import { Link } from "react-router-dom";
//import { useContext } from 'react'
import { useAuth } from '../features/AuthProvider'

import './header.css'

const Header = (props) => {

   const { token, onLogout } = useAuth()
   //const { onLogout } = useAuth()

   console.log("token in header: ", token)

   /*
      these functions should replaced with a more dynmaic style of building these links
      - put them in a list?

      - the /profile page should really route from /user or /storeowner or /admin
      -so /user/profile
   */
   const buildAuthLinks = (type, path) =>{
      return <> <strong>{type} Links: </strong>
         <Link to={path}>{type} Home </Link> | {" "}
         <Link to={"./" + type + "/profile"}> Profile </Link> | {" "}
         <Link to="./login" onClick={ onLogout } > Logout </Link> 
      </>
   }

   const buildNoAuthLinks = () =>{
      return <> <strong>NoAuth Links: </strong>
         <Link to="./">NoAuthHome</Link> | {" "}
         <Link to="/register">Register</Link> | {" "}
         <Link to="/login">Log In</Link>
      </>
   }

    return (
       <div className="header">  
          {token ? <><p>Hello Auth Header</p></> : <><p>Hello noauth Header</p></>}
          <nav>
            {token ? buildAuthLinks(token.type, token.path) : buildNoAuthLinks() } 
            {"    "}
            <strong>Links: </strong>
            <Link to="./about">About</Link>
         </nav>

       </div>);}
  
  export default Header;
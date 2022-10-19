import { Link } from "react-router-dom";

function Header(props) {

    return (
       <div>  
          <p>Hello Header</p>
          <nav>
            <Link to="/">GuestHome</Link> | {" "}
            <Link to="/register">Register</Link> | {" "}
            <Link to="/login">Log In</Link>
            </nav>
       </div>);}
  
  export default Header;
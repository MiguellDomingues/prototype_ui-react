import { Navigate,useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { useAuth } from '../../features/AuthProvider'

function Authenticate() {

    const { onLogin, token } = useAuth()
    //const navigate = useNavigate();

    console.log("authenticate token? ", token? true : false)

    const [credentials, setCredentials] = useState({username: "", password: ""})
    const [authStatus, setStatus] = useState({result: false , status_msg: ""})
    const [submitting, setSubmit] =  useState(false)

    const onChange = e => {setCredentials({...credentials,[e.target.name]: e.target.value})}

     const handleResult = (response) =>{
        console.log("handle fail login: ", response)
        setSubmit(false)
        setStatus({status: false, status_msg: response.reason})
     }

    const handleSubmit = e => {
        e.preventDefault()

        setCredentials({username: "", password: ""})
        setStatus({status: false, status_msg: "validating auth..."})

        if (credentials.username.trim() && credentials.password.trim()){ //check blanks
           setSubmit(true)
           onLogin({...credentials}, handleResult)     
        } else {
           setStatus({status: false, status_msg: "no empty fields"})
        }

     }

     /*
     useEffect(() => { 
        if(token){
            navigate(token.path);
            console.log("authentication useEffect")
            //setStatus({status: true , status_msg: ""})
        } 
    },[navigate, token]);
    */

    const buildAuthPage = (token) =>{

        if(token){
            return <Navigate to={token.path} replace />
        }else{
            return (<>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="UserName: " value={credentials.username} name="username" onChange={onChange}/>
                <input type="password" placeholder="Password: " value={credentials.password} name="password" onChange={onChange}/>     
                <button disabled={submitting} name="status">Log In</button><br/>
            </form>
            {authStatus.status_msg}
            </>)
        }   
     }

    return (<div>{buildAuthPage(token)}</div>);
  }

  /*
 {console.log("auth render")}
        {authStatus.status ?  <Navigate to={token.path} replace /> : <></> }

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="UserName: " value={credentials.username} name="username" onChange={onChange}/>
            <input type="password" placeholder="Password: " value={credentials.password} name="password" onChange={onChange}/>     
            <button disabled={submitting} name="status">Register</button><br/>
        </form>
        {authStatus.status_msg}





 return (<div>
    <form onSubmit={handleSubmit}>
            <input type="text" placeholder="UserName: " value={credentials.username} name="username" onChange={onChange}/>
            <input type="password" placeholder="Password: " value={credentials.password} name="password" onChange={onChange}/>
            
            <button disabled={submitting} name="status">Register</button><br/>
            {authStatus.status ?  <Navigate to={token.path} replace /> : authStatus.status_msg}
         </form>
    </div>);
  */
  
  export default Authenticate;

  /*

  <form onSubmit={handleSubmit}>
            <input type="text" placeholder="UserName: " value={formInput.username} name="username" onChange={onChange}/>
            <input type="password" placeholder="Password: " value={formInput.password} name="password" onChange={onChange}/>
            <select name="type" onChange={onChange}>
               <option value="user">User</option>
               <option value="storeowner">Store Owner</option>
               <option value="admin">Admin</option>
            </select>
            <button disabled={submitting} name="status">Register</button><br/>
            {registerStatus.status ? <Navigate to={registerStatus.path} replace /> : printForm()}
         </form>

  */
import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"

import { useAuth } from '../../features/AuthProvider'

function Registration() {

   const { token, onRegistration } = useAuth()

   console.log("register token? ", token? true : false)

   //use 1 state object for form inputs
   const [formInput, setFormInput] =
      useState({
         username: "",
         password: "",
         type: "USER"})

   //use another state for registration response
   const [registerStatus, setStatus] = 
      useState({
         status: false,
         status_msg: "",
      })
   
   //.. and another for UI state
   const [submitting, setSubmit] =  useState(false)

      const onChange = e => {
         setFormInput({
           ...formInput,
           [e.target.name]: e.target.value})
      }

      const handleResult = (response) =>{
         console.log("handle fail registration: ", response)
         setSubmit(false)
         setStatus({status: false, status_msg: response.reason})
      }

      const handleSubmit = e => {
         e.preventDefault()
         if (formInput.username.trim() && formInput.password.trim()){ //check blanks
            setFormInput( {...formInput, password: ""} )
            setSubmit(true)
            onRegistration({...formInput}, handleResult)  
         } else {
            setStatus({status: false, status_msg: "no empty fields"})    
         }
      }

      /*
      useEffect(() => { 
         if(token){
             setStatus({status: true , status_msg: ""})
             console.log("registration useffect")
         } 
     },[setStatus, token]);

      */

      const buildRegistrationPage = (token) =>{

         if(token){
             return <Navigate to={token.path} replace />
         }else{
             return (
             <>
               <h1>Hello Registration</h1>
                  <form onSubmit={handleSubmit}>
                     <input type="text" placeholder="UserName: " value={formInput.username} name="username" onChange={onChange}/>
                     <input type="password" placeholder="Password: " value={formInput.password} name="password" onChange={onChange}/>
                     <select name="type" onChange={onChange}>
                        <option value="USER">User</option>
                        <option value="STOREOWNER">Store Owner</option>
                        <option value="ADMIN">Admin</option>
                     </select>
                     <button disabled={submitting} name="status">Register</button><br/>
                  </form>
                  status: {registerStatus.status_msg}<br/>
                  UserName: {formInput.username}<br/>
                  Password: {formInput.password}<br/>
                  User Type: {formInput.type}<br/>
             </>)
         }   
      }

    return (<div>{buildRegistrationPage(token)}</div>);
  }
  
  export default Registration;

/*
return (
       <div>
          <h1>Hello Registration</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="UserName: " value={formInput.username} name="username" onChange={onChange}/>
            <input type="password" placeholder="Password: " value={formInput.password} name="password" onChange={onChange}/>
            <select name="type" onChange={onChange}>
               <option value="user">User</option>
               <option value="storeowner">Store Owner</option>
               <option value="admin">Admin</option>
            </select>
            <button disabled={submitting} name="status">Register</button><br/>
            {registerStatus.status ? <Navigate to={token.path} replace /> : printForm()}
         </form>
       </div>);
*/

 
import { useState } from 'react'
import { Navigate } from "react-router-dom"

function Registration() {

   //use 1 state object for form inputs
   const [formInput, setFormInput] =
      useState({
         username: "",
         password: "",
         type: "user"})

   //use another state for registration response
   const [registerStatus, setStatus] = 
      useState({
         status: false,
         status_msg: "",
      })
   
   //.. and another for UI state
   const [submitting, setSubmit] =  useState(false)

   /*
         when we CHANGE STATE inside a handler and then read it, we dont read the LATEST state
         the state object reflects the data since last render
   */
    
      const validate = async (request) => {
         
         console.log("fetch props: ", request)

         const success = true
         const key = "12345678"
         const path = "/" + request.type + "/" + key

         setTimeout( () => {

            console.log("async executed", request, success)

            if(success){
               setStatus({status: true, path: path})
            }else{
               setFormInput({...formInput, status: false, status_msg: "username in use"})
            }
            
            setSubmit(false)

         } ,1500)

         //console.log("validate exit ")
      }

      const onChange = e => {
         setFormInput({
           ...formInput,
           [e.target.name]: e.target.value})
      }

      const handleSubmit = e => {

         console.log("handleSubmit",e)
         //setFormInput({...formInput, status: false, status_msg: "no empty fields"})

         e.preventDefault()
         if (formInput.username.trim() && formInput.password.trim()){ //check blanks

            setSubmit(true)
            console.log("before callout: ", formInput)
         
            validate({...formInput})

            //console.log("after callout: ")

         } else {
            setStatus({status: false, status_msg: "no empty fields"})
            //setFormInput({...formInput, status: false, status_msg: "no empty fields"})
         }
      }

      const printForm = () =>{

         return (<>
            status: {registerStatus.status_msg}<br/>
            UserName: {formInput.username}<br/>
            Password: {formInput.password}<br/>
            User Type: {formInput.type}<br/></>);
      }

      


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
            {registerStatus.status ? <Navigate to={registerStatus.path} replace /> : printForm()}
         </form>
       </div>);
  }
  
  export default Registration;

  // { /*registrationStatus.error ? registrationStatus.err_msg : <></> */ }
  //{/*<button onClick={registrationHandler(true, "registration failed")}>Register Success</button>*/}

 
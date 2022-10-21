import { Link } from "react-router-dom";

import { useAuth } from './AuthProvider'

/*
class HeaderBuilder{

    render(){
        return <></>
    }
}
*/

const HeaderBuilder = () =>{

    const { token } = useAuth()
   
   console.log("token in header: ", token)

   

    return <></>

}

export default HeaderBuilder


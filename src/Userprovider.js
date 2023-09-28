import React ,{useEffect, useState} from "react";
import Mycontext from "./Context";
import axios from "axios";

const UserProvider = ({children})=>{

    const[userdata,setuser]=useState({});
    
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("sitetoken")
       
        }
           axios.post('https://travel-log-8b5m.onrender.com/user/verifylogin', usertoken)
            .then((res) => {
                const { data } = res
                setuser(data)
               
        })

            .catch((error) => {

                console.log(error)
            })
            
    }

, [])


    return(
    <Mycontext.Provider value={{userdata}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;
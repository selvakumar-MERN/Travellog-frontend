import React ,{useEffect, useState} from "react";
import Mycontext from "./Context";
import axios from "axios";
import { userverify } from "./Componenets/Utilis/Apis";

const UserProvider = ({children})=>{

    const[userdata,setuser]=useState({});
    const[fav,setfav]=useState([])
    
    useEffect( () => {
        
        const usertoken = {
            token: window.localStorage.getItem("sitetoken")
       
        }
        if(!usertoken.token){
            usertoken.token=window.localStorage.getItem("siteadmin-token")
       }
           axios.post(userverify, usertoken)
            .then((res) => {
                const { data } = res
                setuser(data)
               
        })

            .catch((error) => {

                return(error)
            })
            
    }

, [])


    return(
    <Mycontext.Provider value={{userdata,fav,setfav}}>{children}</Mycontext.Provider>
    )
}
export default UserProvider;
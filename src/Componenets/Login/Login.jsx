import React, { useEffect, useState } from 'react';
import '../Registeration/Registration.css'
import Nav from '../Nav/Nav';
import axios from 'axios';
import { login, loginemail } from '../Utilis/Apis';


function Login(props) {
    const [form, setform] = useState(false)
    const[data,setdata]=useState("")
    const [fieldverify, setfield] = useState("")
    const [usermessage, setusermessage] = useState("");

     useEffect(()=>{
             if(window.localStorage.getItem('sitetoken')){
                   window.location.href='/'
             }
             else if(window.localStorage.getItem('siteadmin-token')){
                  window.location.href='/'
             }
            
     },[])

    const emailverify = (e) => {
        e.preventDefault()
        axios.post(loginemail,data)
        .then((res)=>{
           if(res){
           setusermessage("")
           setform(true)
           }
        })
        .catch((error)=>{
           if (Array.isArray(error.response.data.details)) {
               const { details } = error.response.data
               const { message } = details[0]
               setusermessage(message)
           }
           else {
               const response = error.response.data;
               setusermessage(response)
           }

        })
    }

    const handler=(e)=>{
        const{name,value}=e.target;
         setdata({...data,[name]:value})      
    }

    const submit=(e)=>{
         e.preventDefault();
         axios.post(login,data)
         .then((res)=>{
            setusermessage("")
            if(res.data.user==="admin"){
            setfield("Login successfull")
            window.localStorage.setItem('siteadmin-token',res.data.token)
            window.location.href='/admin/hotels'
            }
            else{
                setfield("Login successfull")
                window.localStorage.setItem('sitetoken',res.data.token)
                window.location.href='/'

            }

         })
         .catch((error)=>{
               console.log(error)
               setfield("")
               
               const response = error.response.data;
               setusermessage(response)
            

         })
    }

    return (
        <div >
            
            <Nav/>
            <div className='emailarea'>
                {!form ? <div>
                    <form action="" className="form">
                        <h3>Sign in</h3>
                        <div className='label'>
                            <label>Email address</label>
                        </div>
                        <div >
                            <input className='input' type='email' name='email'  onChange={handler} placeholder='Enter your email address'></input>
                        </div>
                        <div className='m-2'>
                                        {usermessage !== null ? <span className="text-warning">{usermessage}</span> : null}
                                       
                                    </div>
                        <button className='formbutton' onClick={(e) => emailverify(e)}>Continue with email</button>
                    </form>
                    <hr></hr>
                    <div style={{ textAlign: "center", fontSize: '12px' }}>
                        <span >use one of these options</span>
                    </div>
                    <div className='signinoptions'>
                        <a href='/' className='signitem'>
                            <img src='images\logo-facebookpng-32242.png' height={'30px'} width={'30px'} alt='fb'></img>
                        </a>
                        <a href='/' className='signitem'>
                            <img src='images\google-logo-9808.png' height={'30px'} width={'30px'} alt='google'></img>
                        </a>
                        <a href='/' className='signitem'>
                            <img src='' height={'30px'} width={'30px'} alt='fb'></img>
                        </a>
                    </div>
                </div> :
                    <form action="" className="form">
                        <h3>Enter password</h3>
                        <div className='label'>
                            <label>Password</label>
                        </div>
                        <div >
                            <input className='input' type='password'  onChange={handler} name='password' placeholder='Enter a password'></input>
                        </div>
                        <div className='m-2'>
                                        {usermessage !== null ? <span className='text-warning'>{usermessage}</span> : null}
                                        {fieldverify !== null ? <span className='text-success'>{fieldverify}</span> : null}
                                    </div>
                        <button className='formbutton' onClick={submit}>Logi in</button>
                    </form>
                }
                <hr></hr>
                <div className='terms'>
                    <span >By signing in , you agree with our Terms & conditions and Privacy statement</span>
                </div>
                <hr></hr>
                <div className='terms'>
                    <span>All rights reserved.
                        Copyright (2023 - 2023) - Travellog™</span>
                </div>

            </div>

        </div>
    );
}

export default Login;
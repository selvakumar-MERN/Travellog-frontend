import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './Registration.css'
import axios from 'axios';

function Registration(props) {
    const [form, setform] = useState(false)
    const[data,setdata]=useState("")
    const [fieldverify, setfield] = useState("")
    const [usermessage, setusermessage] = useState("");
    const emailverify = (e) => {
        e.preventDefault()
        axios.post('https://travel-log-8b5m.onrender.com/user/emailverify',data)
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
        console.log(data)
         e.preventDefault();
         axios.post('https://travel-log-8b5m.onrender.com/user/register',data)
         .then((res)=>{
            const response = res.data
            setusermessage("")
            setfield(response)

         })
         .catch((error)=>{
              if (Array.isArray(error.response.data.details)) {
                setfield("")
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
    return (
        <div >
            <Nav />
            <div className='emailarea'>
                {!form ? <div>
                    <form action="" className="form">
                        <h3>Create an account</h3>
                        <div className='label'>
                            <label>Email address</label>
                        </div>
                        <div >
                            <input className='input' type='email' name='email' onChange={handler} placeholder='Enter your email address'></input>
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
                        <h3>Create password</h3>
                        <div className='label'>
                            <label>Password</label>
                        </div>
                        <div >
                            <input className='input' type='password' onChange={handler} name='password' placeholder='Enter a password'></input>
                        </div>
                        <div className='label'>
                            <label>Confirm Password</label>
                        </div>
                        <div >
                            <input className='input' type='password' onChange={handler} name='confirmPassword' placeholder='Confirm your password'></input>
                        </div>
                        <div className='m-2'>
                                        {usermessage !== null ? <span className='text-warning'>{usermessage}</span> : null}
                                        {fieldverify !== null ? <span className='text-success'>{fieldverify}</span> : null}
                                    </div>
                        <button className='formbutton' onClick={submit} >Create account</button>
                    </form>
                }
                <hr></hr>
                <div className='terms'>
                    <span >By signing in or creating an account, you agree with our Terms & conditions and Privacy statement</span>
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

export default Registration;
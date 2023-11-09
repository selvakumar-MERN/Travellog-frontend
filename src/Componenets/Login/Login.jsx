import React, { useEffect, useState } from 'react';
import '../Registeration/Registration.css'
import Nav from '../Nav/Nav';
import axios from 'axios';
import Googleauth from '../Auth/Googleauth';
import { Link } from 'react-router-dom';


function Login(props) {
    const [form, setform] = useState(false)
    const [data, setdata] = useState({ email: "", password: "" })
    const [fieldverify, setfield] = useState("")
    const [usermessage, setusermessage] = useState("");
    const [demo, setdemo] = useState("")

    useEffect(() => {
        if (window.localStorage.getItem('sitetoken')) {
            window.location.href = '/'
        }
        else if (window.localStorage.getItem('siteadmin-token')) {
            window.location.href = '/'
        }

    }, [])



    const emailverify = (e) => {
        const value = { email: document.getElementById("email").value }
        e.preventDefault()
        axios.post('http://localhost:3030/user/loginemail', value)
            .then((res) => {
                if (res) {
                    setusermessage("")
                    setform(true)
                    setdemo("")
                    data.email = value.email;
                    setdata({ ...data })
                }
            })
            .catch((error) => {
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

    const userdemo = (e) => {
        e.preventDefault();
        if (e.target.name === "admin") {
            setdemo("admin@gmail.com")
        }
        else {
            setdemo("selva81222@gmail.com")
        }

    }
    const passworddemo = (e) => {
        e.preventDefault();
        if (e.target.name === "admin") {
            setdemo("admin123")
        }
        else {
            setdemo("selva123")
        }

    }

    const submit = (e) => {
        data.password = demo;
        setdata({ ...data })
        e.preventDefault()
        axios.post('http://localhost:3030/user/login', data)
            .then((res) => {
                setusermessage("")
                setdemo("")
                if (res.data.user === "admin") {
                    setfield("Login successfull")
                    window.localStorage.setItem('siteadmin-token', res.data.token)
                    window.location.href = '/admin/hotels'
                }
                else {
                    setfield("Login successfull")
                    window.localStorage.setItem('sitetoken', res.data.token)
                    window.location.href = '/'

                }

            })
            .catch((error) => {
                setfield("")

                const response = error.response.data;
                setusermessage(response)


            })
    }

    return (
        <div >

            <Nav />
            <div className='emailarea'>
                {!form ? <div>
                    <form action="" className="form">
                        <h3>Sign in</h3>
                        <div className='label'>
                            <label>Email address</label>
                        </div>
                        <div >
                            <input className='input' type='email' name='email' id='email' value={demo === "" ? null
                                : demo} placeholder='Enter your email address'></input>

                        </div>
                        <div className='m-2'>
                            {usermessage !== null ? <span className="text-warning">{usermessage}</span> : null}

                        </div>
                        <button className='formbutton' onClick={(e) => emailverify(e)}>Continue with email</button>
                        <div className='demo-button'>
                            <button name='user' onClick={userdemo}>Demo User Email</button>
                            <button name='admin' onClick={userdemo}>Demo Admin Email</button>
                        </div>
                    </form>
                    <hr></hr>
                    <div style={{ textAlign: "center", fontSize: '12px' }}>
                        <span >use google to sign-in</span>
                    </div>
                    <div className='signinoptions'>
                        
                        <Googleauth />
                        
                    </div>
                    <div style={{ textAlign: "center", fontSize: '12px' }}>
                        <span >Don't have account ? <Link to='/registration' style={{color:'blue'}}>Register</Link></span>
                    </div>
                </div> :
                    <form action="" className="form">
                        <h3>Enter password</h3>
                        <div className='label'>
                            <label>Password</label>
                        </div>
                        <div >
                            <input className='input' type='password' value={demo === "" ? null
                                : demo} name='password' placeholder='Enter a password'></input>
                        </div>
                        <div className='m-2'>
                            {usermessage !== null ? <span className='text-warning'>{usermessage}</span> : null}
                            {fieldverify !== null ? <span className='text-success'>{fieldverify}</span> : null}
                        </div>
                        <button className='formbutton' onClick={submit}>Login</button>
                        <div className='demo-button'>
                            <button name='user' onClick={passworddemo}>Demo User Password</button>
                            <button name='admin' onClick={passworddemo}>Demo Admin Password</button>
                        </div>
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